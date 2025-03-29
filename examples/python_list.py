import json
import base64

def encode_for_urltodo(data):
    """Encode data for URLTodo app using Python"""
    # Step 1: Convert to JSON string (equivalent to JSON.stringify)
    json_str = json.dumps(data)
    
    # Steps 2-3: Instead of encodeURIComponent + unescape, 
    # we directly encode the string to UTF-8 bytes
    utf8_bytes = json_str.encode('utf-8')
    
    # Step 4: Base64 encode (equivalent to btoa)
    base64_bytes = base64.b64encode(utf8_bytes)
    
    # Convert back to string for URL usage
    base64_str = base64_bytes.decode('ascii')
    
    return base64_str

# Example usage
todo_data = {
    "title": "Python Shopping List",
    "tasks": [
        {
            "id": "1743242653576",
            "text": "Apples 🍎",
            "completed": False
        },
        {
            "id": "1743242653913", 
            "text": "Bananas 🍌",
            "completed": True
        }
    ]
}

encoded_data = encode_for_urltodo(todo_data)
todo_url = f"https://urltodo.com/#{encoded_data}"

print(todo_url)