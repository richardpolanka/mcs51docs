"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CodeExample, Section } from '@/lib/supabase';

interface EditCodeExampleFormProps {
  example: CodeExample;
  sections: Section[];
  onUpdate: (data: Partial<CodeExample>) => void;
  onDelete: () => void;
}

export function EditCodeExampleForm({ example, sections, onUpdate, onDelete }: EditCodeExampleFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(example);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-base">
            <span>{example.title}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Upravit
              </Button>
              <Button variant="destructive" size="sm" onClick={onDelete}>
                Smazat
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <Label>Kód</Label>
              <pre className="mt-1 bg-slate-100 p-2 rounded whitespace-pre-wrap text-sm">{example.code}</pre>
            </div>
            {example.description && (
              <div>
                <Label>Popis</Label>
                <div className="mt-1">{example.description}</div>
              </div>
            )}
            <div>
              <Label>Sekce</Label>
              <div className="mt-1">
                {sections.find(s => s.id === example.section_id)?.title || 'Žádná sekce'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Úprava: {example.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Název</Label>
            <Input 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="code">Kód</Label>
            <Textarea 
              id="code" 
              name="code" 
              value={formData.code} 
              onChange={handleChange} 
              required 
              rows={5}
            />
          </div>
          <div>
            <Label htmlFor="description">Popis</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description || ''} 
              onChange={handleChange} 
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="section_id">Sekce</Label>
            <Select 
              name="section_id"
              value={formData.section_id} 
              onValueChange={(value) => handleSelectChange('section_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Vyberte sekci" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <SelectItem key={section.id} value={section.id}>
                    {section.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="order">Pořadí</Label>
            <Input 
              id="order" 
              name="order" 
              type="number" 
              value={formData.order} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
              Zrušit
            </Button>
            <Button type="submit">
              Uložit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}