import re

css_path = r'c:\Users\CARLA\Desktop\job\me\css\styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Replace the existing :root variables
new_vars = '''/* ===== CSS VARIABLES ===== */
:root[data-theme="dark"] {
    --primary: #0ea5e9;
    --secondary: #14b8a6;
    --accent: #8b5cf6;
    
    --bg-main: #0a0f1c;
    --bg-card: rgba(15, 23, 42, 0.7);
    --bg-nav: rgba(15, 23, 42, 0.98);
    --bg-glass-hover: rgba(255, 255, 255, 0.1);
    
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    
    --border-color: rgba(255, 255, 255, 0.1);
    --border-hover: rgba(255, 255, 255, 0.2);
    --shadow-color: rgba(0, 0, 0, 0.4);
    
    --gradient-1: #0f172a;
    --gradient-2: #1e293b;
    --gradient-3: #1e1b4b;
    
    --particle: rgba(14, 165, 233, 0.1);
    
    --code-bg: rgba(255, 255, 255, 0.05);
}

:root[data-theme="light"], :root {
    --primary: #0284c7;
    --secondary: #0f766e;
    --accent: #6d28d9;
    
    --bg-main: #f8fafc;
    --bg-card: rgba(255, 255, 255, 0.85);
    --bg-nav: rgba(248, 250, 252, 0.95);
    --bg-glass-hover: rgba(0, 0, 0, 0.05);
    
    --text-main: #0f172a;
    --text-muted: #475569;
    
    --border-color: rgba(0, 0, 0, 0.1);
    --border-hover: rgba(0, 0, 0, 0.2);
    --shadow-color: rgba(0, 0, 0, 0.1);

    --gradient-1: #e2e8f0;
    --gradient-2: #f1f5f9;
    --gradient-3: #e2e8f0;
    
    --particle: rgba(2, 132, 199, 0.15);
    
    --code-bg: rgba(0, 0, 0, 0.05);
}
'''
css = re.sub(r':root\s*\{[^}]+\}', new_vars, css)

# Replace references
css = css.replace('var(--darker)', 'var(--bg-main)')
css = css.replace('var(--dark)', 'var(--gradient-1)')
css = css.replace('var(--light)', 'var(--text-main)')
css = css.replace('#0f172a', 'var(--gradient-1)')

# Backgrounds
css = css.replace('rgba(15, 23, 42, 0.7)', 'var(--bg-card)')
css = css.replace('rgba(15, 23, 42, 0.98)', 'var(--bg-nav)')
css = css.replace('rgba(255, 255, 255, 0.1)', 'var(--border-color)')
css = css.replace('rgba(255, 255, 255, 0.05)', 'var(--bg-glass-hover)')
css = css.replace('rgba(255, 255, 255, 0.2)', 'var(--border-hover)')
css = css.replace('rgba(0, 0, 0, 0.4)', 'var(--shadow-color)')

# Fix gradient replacements more precisely
css = css.replace('#0f172a, #1e293b, #0f172a, #1e1b4b', 'var(--gradient-1), var(--gradient-2), var(--gradient-1), var(--gradient-3)')

# Transition rule
if "transition: background-color" not in css:
    css += '\n\n/* Theme transition rules */\nbody, .glass, .navbar, .portfolio-card, .service-card, .skill-card, .timeline-card, .certification-card, p, h1, h2, h3, h4, h5, h6, span, a, div {\n    transition: background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease !important;\n}\n\n.gradient-bg {\n    background: linear-gradient(-45deg, var(--gradient-1), var(--gradient-2), var(--gradient-1), var(--gradient-3));\n}\n'

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print('Updated styles.css successfully.')
