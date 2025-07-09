#!/usr/bin/env python3
"""
MongoDB Connection Module for DSA Learning System

This module provides MongoDB connection and user profile operations.
"""

import os
import pymongo
from pymongo import MongoClient
from bson import ObjectId
from typing import Dict, Optional, List
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class MongoDBHandler:
    def __init__(self):
        """Initialize MongoDB connection."""
        self.mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
        self.database_name = os.getenv("DATABASE_NAME", "dsa_learning_system")
        self.client = None
        self.db = None
        self.connect()
    
    def connect(self):
        """Establish connection to MongoDB."""
        try:
            self.client = MongoClient(self.mongo_uri)
            self.db = self.client[self.database_name]
            # Test connection
            self.client.admin.command('ping')
            print("Successfully connected to MongoDB")
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            self.client = None
            self.db = None
    
    def close(self):
        """Close MongoDB connection."""
        if self.client:
            self.client.close()
    
    def get_user_profile(self, user_id: str) -> Optional[Dict]:
        """
        Fetch user profile from MongoDB by user_id.
        
        Args:
            user_id (str): User ID or email
            
        Returns:
            Optional[Dict]: User profile data or None if not found
        """
        try:
            if self.db is None:
                print("Database connection not available")
                return None
            
            users_collection = self.db.users
            
            # Try to find user by _id first (handle ObjectId conversion)
            user = None
            try:
                # Try as ObjectId first
                if ObjectId.is_valid(user_id):
                    user = users_collection.find_one({"_id": ObjectId(user_id)})
                else:
                    # Try as string
                    user = users_collection.find_one({"_id": user_id})
            except:
                # If ObjectId conversion fails, try as string
                user = users_collection.find_one({"_id": user_id})
            
            # If not found by _id, try by email
            if not user:
                user = users_collection.find_one({"email": user_id})
            
            # If not found by email, try by googleId
            if not user:
                user = users_collection.find_one({"googleId": user_id})
            
            if user:
                # Convert MongoDB document to the expected format
                profile = {
                    "id": str(user.get("_id", user_id)),
                    "name": user.get("name", ""),
                    "email": user.get("email", ""),
                    "avatar": user.get("avatar", ""),
                    "isFirstTime": user.get("isFirstTime", True),
                    "userInfo": user.get("userInfo", {}),
                    "knownConcepts": user.get("knownConcepts", {
                        "topics": [],
                        "totalTopics": 0,
                        "totalSubtopics": 0
                    }),
                    "createdAt": user.get("createdAt"),
                    "updatedAt": user.get("updatedAt")
                }
                return profile
            else:
                print(f"User not found: {user_id}")
                return None
                
        except Exception as e:
            print(f"Error fetching user profile: {e}")
            return None
    
    def update_user_profile(self, user_id: str, profile_data: Dict) -> bool:
        """
        Update user profile in MongoDB.
        
        Args:
            user_id (str): User ID or email
            profile_data (Dict): Updated profile data
            
        Returns:
            bool: True if update successful, False otherwise
        """
        try:
            if self.db is None:
                print("Database connection not available")
                return False
            
            users_collection = self.db.users
            
            # Add updatedAt timestamp
            profile_data["updatedAt"] = datetime.utcnow()
            
            # Update user profile - try ObjectId first
            result = None
            try:
                if ObjectId.is_valid(user_id):
                    result = users_collection.update_one(
                        {"_id": ObjectId(user_id)},
                        {"$set": profile_data}
                    )
                else:
                    result = users_collection.update_one(
                        {"_id": user_id},
                        {"$set": profile_data}
                    )
            except:
                result = users_collection.update_one(
                    {"_id": user_id},
                    {"$set": profile_data}
                )
            
            if result.matched_count == 0:
                # Try updating by email
                result = users_collection.update_one(
                    {"email": user_id},
                    {"$set": profile_data}
                )
            
            if result.matched_count == 0:
                # Try updating by googleId
                result = users_collection.update_one(
                    {"googleId": user_id},
                    {"$set": profile_data}
                )
            
            return result.modified_count > 0
            
        except Exception as e:
            print(f"Error updating user profile: {e}")
            return False
    
    def add_topic_to_user_profile(self, user_id: str, topic_data: Dict) -> bool:
        """
        Add a topic to user's known concepts.
        
        Args:
            user_id (str): User ID or email
            topic_data (Dict): Topic data to add
            
        Returns:
            bool: True if addition successful, False otherwise
        """
        try:
            if self.db is None:
                print("Database connection not available")
                return False
            
            users_collection = self.db.users
            
            # Check if topic already exists
            user = None
            try:
                if ObjectId.is_valid(user_id):
                    user = users_collection.find_one({"_id": ObjectId(user_id)})
                else:
                    user = users_collection.find_one({"_id": user_id})
            except:
                user = users_collection.find_one({"_id": user_id})
            
            if not user:
                user = users_collection.find_one({"email": user_id})
            if not user:
                user = users_collection.find_one({"googleId": user_id})
            
            if not user:
                print(f"User not found: {user_id}")
                return False
            
            known_concepts = user.get("knownConcepts", {"topics": [], "totalTopics": 0, "totalSubtopics": 0})
            existing_topics = [t.get("name", "").lower() for t in known_concepts.get("topics", [])]
            
            # Check if topic already exists
            if topic_data.get("name", "").lower() in existing_topics:
                print(f"Topic {topic_data.get('name')} already exists for user {user_id}")
                return False
            
            # Add new topic
            known_concepts["topics"].append(topic_data)
            known_concepts["totalTopics"] += 1
            
            # Update user profile
            result = None
            try:
                if ObjectId.is_valid(user_id):
                    result = users_collection.update_one(
                        {"_id": ObjectId(user_id)},
                        {
                            "$set": {
                                "knownConcepts": known_concepts,
                                "updatedAt": datetime.utcnow()
                            }
                        }
                    )
                else:
                    result = users_collection.update_one(
                        {"_id": user_id},
                        {
                            "$set": {
                                "knownConcepts": known_concepts,
                                "updatedAt": datetime.utcnow()
                            }
                        }
                    )
            except:
                result = users_collection.update_one(
                    {"_id": user_id},
                    {
                        "$set": {
                            "knownConcepts": known_concepts,
                            "updatedAt": datetime.utcnow()
                        }
                    }
                )
            
            if result.matched_count == 0:
                # Try updating by email
                result = users_collection.update_one(
                    {"email": user_id},
                    {
                        "$set": {
                            "knownConcepts": known_concepts,
                            "updatedAt": datetime.utcnow()
                        }
                    }
                )
            
            if result.matched_count == 0:
                # Try updating by googleId
                result = users_collection.update_one(
                    {"googleId": user_id},
                    {
                        "$set": {
                            "knownConcepts": known_concepts,
                            "updatedAt": datetime.utcnow()
                        }
                    }
                )
            
            return result.modified_count > 0
            
        except Exception as e:
            print(f"Error adding topic to user profile: {e}")
            return False
    
    def create_user_profile(self, user_data: Dict) -> bool:
        """
        Create a new user profile in MongoDB.
        
        Args:
            user_data (Dict): User data to create
            
        Returns:
            bool: True if creation successful, False otherwise
        """
        try:
            if self.db is None:
                print("Database connection not available")
                return False
            
            users_collection = self.db.users
            
            # Add timestamps
            user_data["createdAt"] = datetime.utcnow()
            user_data["updatedAt"] = datetime.utcnow()
            
            # Ensure knownConcepts structure
            if "knownConcepts" not in user_data:
                user_data["knownConcepts"] = {
                    "topics": [],
                    "totalTopics": 0,
                    "totalSubtopics": 0
                }
            
            # Insert user
            result = users_collection.insert_one(user_data)
            return result.inserted_id is not None
            
        except Exception as e:
            print(f"Error creating user profile: {e}")
            return False
    
    def get_all_users(self) -> List[Dict]:
        """
        Get all users from MongoDB.
        
        Returns:
            List[Dict]: List of all user profiles
        """
        try:
            if self.db is None:
                print("Database connection not available")
                return []
            
            users_collection = self.db.users
            users = list(users_collection.find({}))
            
            # Convert ObjectId to string for JSON serialization
            for user in users:
                user["_id"] = str(user["_id"])
            
            return users
            
        except Exception as e:
            print(f"Error fetching all users: {e}")
            return []
