'use client';

import { useTheme } from '../components/ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { AppShell } from '../components/AppShell';

const themes = [
  { id: 'default', name: 'TradeSage Pro', description: 'Professional finance theme with gold accents' },
  { id: 'celo', name: 'CELO', description: 'Black background with yellow accents' },
  { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
  { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
  { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue accents' },
];

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  return (
    <AppShell currentPage="settings">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Theme Preview</h1>
          <p className="text-text-secondary mt-1">
            Preview and switch between different visual themes
          </p>
        </div>

        {/* Theme Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Available Themes</CardTitle>
            <CardDescription>Choose your preferred visual style</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {themes.map((themeOption) => (
                <Card
                  key={themeOption.id}
                  variant="interactive"
                  onClick={() => setTheme(themeOption.id as any)}
                  className={`cursor-pointer transition-all duration-200 ${
                    theme === themeOption.id ? 'ring-2 ring-accent' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-text-primary">{themeOption.name}</h3>
                      {theme === themeOption.id && (
                        <Badge variant="default">Active</Badge>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">{themeOption.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Component Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Buttons Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Button Styles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </CardContent>
          </Card>

          {/* Badges Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Badge Styles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>Current theme color variables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Background', var: '--color-bg', class: 'bg-bg' },
                { name: 'Foreground', var: '--color-fg', class: 'bg-fg' },
                { name: 'Accent', var: '--color-accent', class: 'bg-accent' },
                { name: 'Surface', var: '--color-surface', class: 'bg-surface' },
                { name: 'Primary', var: '--color-primary', class: 'bg-primary' },
                { name: 'Success', var: '--color-success', class: 'bg-success' },
                { name: 'Warning', var: '--color-warning', class: 'bg-warning' },
                { name: 'Danger', var: '--color-danger', class: 'bg-danger' },
              ].map((color) => (
                <div key={color.name} className="text-center">
                  <div className={`w-full h-16 rounded-lg ${color.class} mb-2`}></div>
                  <p className="text-sm font-medium text-text-primary">{color.name}</p>
                  <p className="text-xs text-text-secondary">{color.var}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sample Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Sample Metric</p>
                  <p className="text-2xl font-bold text-success">+$1,234.56</p>
                </div>
                <div className="p-3 rounded-lg bg-success/20">
                  <div className="h-6 w-6 bg-success rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Glass Card Example</CardTitle>
              <CardDescription>With backdrop blur effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                This card demonstrates the glass morphism effect used throughout the app.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
