// Developed by Manjistha Bidkar
export const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.126 Safari/537.36'
];

export function getRandomUserAgent(): string {
  const randomIndex = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomIndex];
}
