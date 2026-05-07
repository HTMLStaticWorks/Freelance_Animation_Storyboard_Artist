import os

files = [
    "sequence-details-3.html", "sequence-details-4.html",
    "project-details-2.html", "project-details-3.html", "project-details-4.html", "project-details-5.html", "project-details-6.html",
    "blog-details-2.html", "blog-details-3.html", "blog-details-4.html", "blog-details-5.html", "blog-details-6.html",
    "404.html"
]

for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Fix the messed up emoji and classes
        content = content.replace('<button id="theme-toggle" class="theme-toggle theme-toggle-btn">??</button>', 
                                  '<button class="theme-toggle rtl-toggle-btn">RTL</button><button id="theme-toggle" class="theme-toggle theme-toggle-btn">☀️</button>')
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
