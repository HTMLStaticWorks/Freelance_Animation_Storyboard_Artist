import os

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    # Common replacements
    content = content.replace('Home â–¾', 'Home ▾')
    content = content.replace('â˜€ï¸ ', '☀️')
    content = content.replace('â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢', '••••••••')
    content = content.replace('â€¢', '•')
    content = content.replace('break itâ€”using', 'break it—using')
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for root, _, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            fix_file(os.path.join(root, file))
