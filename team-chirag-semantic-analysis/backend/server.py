from fastapi import FastAPI, Request, Header
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from queryHandling.integrated_chat_handler import IntegratedChatHandler
from typing import List, Dict, Optional
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Initialize the integrated chat handler
chat_handler = IntegratedChatHandler()

# CORS setup to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL", "http://localhost:5173"),
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    message: str
    chat_history: Optional[List[Dict]] = []
    user_id: Optional[str] = "default"

def extract_user_id_from_token(authorization: str = None) -> str:
    """Extract user_id from JWT token or return default."""
    if not authorization:
        return "default"
    
    try:
        # Remove 'Bearer ' prefix if present
        token = authorization.replace('Bearer ', '') if authorization.startswith('Bearer ') else authorization
        
        # Decode JWT token
        jwt_secret = os.getenv('JWT_SECRET', 'your-secret-key')
        payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        
        # Extract user_id from payload
        user_id = payload.get('userId') or payload.get('id') or payload.get('email')
        return user_id if user_id else "default"
        
    except Exception as e:
        print(f"Error extracting user_id from token: {e}")
        return "default"

@app.post("/api/chat")
async def chat(request: MessageRequest, authorization: str = Header(None)):
    prompt = request.message
    chat_history = request.chat_history or []
    
    # Extract user_id from token if available, otherwise use request user_id or default
    user_id = extract_user_id_from_token(authorization)
    if user_id == "default" and request.user_id:
        user_id = request.user_id
    
    # Use the integrated chat handler with enhanced parameters
    result = chat_handler.handle_chat_message(
        message=prompt,
        chat_history=chat_history,
        user_id=user_id
    )
    
    return {
        "response": result.get('response', 'Sorry, I could not process your request.'),
        "videos": result.get('videos', []),
        "analysis": result.get('analysis', {}),
        "error": result.get('error'),
        "user_id": user_id  # Return user_id for debugging
    }

if __name__ == "__main__":
    import uvicorn
    
    # Get port from environment or default to 8000 for FastAPI
    port = int(os.getenv("FASTAPI_PORT", "8000"))
    
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )
