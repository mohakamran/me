import re

html_path = r'c:\Users\CARLA\Desktop\job\me\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# CTA buttons
cta_old = '''                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                        <a href="#portfolio"
                            class="group bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/25 flex items-center justify-center gap-3">
                            <span data-i18n="hero-cta-work">View My Work</span>
                            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                        </a>
                        <a href="#contact"
                            class="group glass hover:bg-gray-800/50 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3">
                            <i class="fas fa-paper-plane"></i>
                            <span data-i18n="hero-cta-contact">Get In Touch</span>
                        </a>
                    </div>'''

cta_new = '''                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                        <a href="#portfolio"
                            class="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center justify-center gap-3 z-10">
                            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-[-1]"></div>
                            <span data-i18n="hero-cta-work">View My Work</span>
                            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                        </a>
                        <a href="#contact"
                            class="group glass text-[var(--text-main)] font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-[var(--bg-glass-hover)] border border-[var(--border-color)] flex items-center justify-center gap-3">
                            <i class="fas fa-paper-plane text-cyan-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"></i>
                            <span data-i18n="hero-cta-contact">Get In Touch</span>
                        </a>
                    </div>'''
html = html.replace(cta_old, cta_new)

# Profile image
profile_old = '''                                <!-- Profile Image -->
                                <div
                                    class="w-60 h-50 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 p-1 shadow-lg">
                                    <div
                                        class="w-full h-full rounded-2xl bg-gray-800 overflow-hidden flex items-center justify-center">
                                        <img src="./gallary/1.jpg" alt="Muhammad Kamran"
                                            class="object-cover transition-transform duration-500" />
                                    </div>
                                </div>'''

profile_new = '''                                <!-- Profile Image -->
                                <div class="relative w-56 h-56 mx-auto mb-8 p-1 rounded-full group-hover:shadow-[0_0_40px_rgba(45,212,191,0.5)] transition-shadow duration-500">
                                    <div class="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-500 to-purple-500 animate-[spin_4s_linear_infinite] rounded-full opacity-80 blur-sm"></div>
                                    <div class="absolute inset-1 bg-[var(--bg-card)] rounded-full z-0"></div>
                                    <div class="relative w-full h-full rounded-full overflow-hidden border-[3px] border-[var(--bg-card)] z-10">
                                        <img src="./gallary/1.jpg" alt="Muhammad Kamran" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                                    </div>
                                </div>'''
html = html.replace(profile_old, profile_new)

# Tech icons enhancements
html = re.sub(r'bg-gray-800/90', 'glass bg-[var(--bg-card)]', html)
html = html.replace('text-gray-300', 'text-[var(--text-muted)]')
html = html.replace('text-white', 'text-[var(--text-main)]')
html = html.replace('bg-gray-800', 'bg-[var(--bg-card)] border-[var(--border-color)]')
html = html.replace('hover:text-white', 'hover:text-[var(--text-main)]')
html = html.replace('hover:bg-gray-700/50', 'hover:bg-[var(--bg-glass-hover)]')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print('Updated index.html hero sections')

css_path = r'c:\Users\CARLA\Desktop\job\me\css\styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

anim_spin = '''
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
'''
if '@keyframes spin' not in css:
    css += anim_spin

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)
print('Updated styles.css with animations')
