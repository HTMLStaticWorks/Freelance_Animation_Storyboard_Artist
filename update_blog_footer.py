import os
import re

directory = r'c:\Users\sriva\OneDrive\Desktop\may websites\Freelance_Animation_Storyboard_Artist'
files = [f for f in os.listdir(directory) if f.startswith('blog-details') and f.endswith('.html')]

target_pattern = r'(<div class="mt-5 pt-5 border-top d-flex justify-content-between align-items-center)"'
replacement = r'\1 blog-details-footer"'

for filename in files:
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = re.sub(target_pattern, replacement, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"No match in {filename}")
