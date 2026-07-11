import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useReducedMotion } from 'motion/react';
import { capabilities, profile, projects } from '../../data/portfolio';

const sectionCommands = [
  { id: 'about', label: 'About and current direction', code: '01' },
  { id: 'experience', label: 'Professional experience', code: '02' },
  { id: 'skills', label: 'Technical capabilities', code: '03' },
  { id: 'work', label: 'Published projects', code: '04' },
  { id: 'education', label: 'Education', code: '05' },
  { id: 'contact', label: 'Contact', code: '06' },
] as const;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    const handleOpenRequest = () => setOpen(true);

    window.addEventListener('keydown', handleKeyboard);
    window.addEventListener('portfolio:open-command', handleOpenRequest);
    return () => {
      window.removeEventListener('keydown', handleKeyboard);
      window.removeEventListener('portfolio:open-command', handleOpenRequest);
    };
  }, []);

  const navigateTo = (id: string, projectIndex?: number) => {
    setOpen(false);
    window.requestAnimationFrame(() => {
      if (projectIndex !== undefined) {
        window.dispatchEvent(
          new CustomEvent('portfolio:project', { detail: { index: projectIndex } }),
        );
      }

      const target = document.getElementById(id);
      target?.scrollIntoView({
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      window.requestAnimationFrame(() => target?.focus({ preventScroll: true }));
    });
  };

  return (
    <>
      <button
        aria-label="Open portfolio command palette"
        className="command-palette-trigger"
        onClick={() => setOpen(true)}
        type="button"
      >
        <span>Quick access</span>
        <kbd>Ctrl K</kbd>
      </button>

      <Command.Dialog
        className="command-palette"
        label="Portfolio command palette"
        loop
        onOpenChange={setOpen}
        open={open}
      >
        <div className="command-palette__topline">
          <span>RA / SYSTEM COMMAND</span>
          <span>Navigate anything</span>
        </div>
        <div className="command-palette__input-row">
          <span aria-hidden="true">⌕</span>
          <Command.Input autoFocus placeholder="Search projects, skills, or sections…" />
          <kbd>ESC</kbd>
        </div>
        <Command.List data-lenis-prevent>
          <Command.Empty>No matching system command.</Command.Empty>

          <Command.Group heading="Navigate">
            {sectionCommands.map((item) => (
              <Command.Item
                key={item.id}
                keywords={[item.id, item.label]}
                onSelect={() => navigateTo(item.id)}
                value={`navigate ${item.label}`}
              >
                <span className="command-item__code">{item.code}</span>
                <span>{item.label}</span>
                <small>Section</small>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Capability spectrum">
            {capabilities.map((capability, index) => (
              <Command.Item
                key={capability.title}
                keywords={[...capability.skills, capability.summary]}
                onSelect={() => navigateTo('skills')}
                value={`skill ${capability.title}`}
              >
                <span className="command-item__code">S{index + 1}</span>
                <span>{capability.title}</span>
                <small>{capability.skills.slice(0, 2).join(' / ')}</small>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Project missions">
            {projects.map((project, index) => (
              <Command.Item
                key={project.name}
                keywords={[project.category, project.role, ...project.technologies]}
                onSelect={() => navigateTo('work', index)}
                value={`project ${project.name}`}
              >
                <span className="command-item__code">P{index + 1}</span>
                <span>{project.name}</span>
                <small>{project.category}</small>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Actions">
            <Command.Item
              keywords={['3d', 'game', 'interactive', 'playground']}
              onSelect={() => {
                setOpen(false);
                window.dispatchEvent(new Event('portfolio:launch-system'));
              }}
              value="launch interactive system"
            >
              <span className="command-item__code">3D</span>
              <span>Launch interactive system</span>
              <small>Playground</small>
            </Command.Item>
            <Command.Item
              keywords={['email', 'hire', 'contact', profile.email]}
              onSelect={() => {
                setOpen(false);
                window.location.href = `mailto:${profile.email}`;
              }}
              value="email Rawezh"
            >
              <span className="command-item__code">@</span>
              <span>Email {profile.name}</span>
              <small>{profile.email}</small>
            </Command.Item>
          </Command.Group>
        </Command.List>
        <div className="command-palette__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Open</span>
          <span>Powered by cmdk</span>
        </div>
      </Command.Dialog>
    </>
  );
}
