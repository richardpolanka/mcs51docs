"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AddressingMode } from '@/lib/supabase';

interface EditAddressingModeFormProps {
  mode: AddressingMode;
  onUpdate: (data: Partial<AddressingMode>) => void;
  onDelete: () => void;
}

export function EditAddressingModeForm({ mode, onUpdate, onDelete }: EditAddressingModeFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
            <span>{mode.title}</span>
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
              <Label>Syntax</Label>
              <div className="mt-1 bg-slate-100 p-2 rounded">{mode.syntax}</div>
            </div>
            <div>
              <Label>Popis</Label>
              <div className="mt-1">{mode.description}</div>
            </div>
            <div>
              <Label>Příklad</Label>
              <pre className="mt-1 bg-slate-100 p-2 rounded whitespace-pre-wrap text-sm">{mode.example}</pre>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Úprava: {mode.title}</CardTitle>
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
            <Label htmlFor="syntax">Syntax</Label>
            <Input 
              id="syntax" 
              name="syntax" 
              value={formData.syntax} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="description">Popis</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="example">Příklad</Label>
            <Textarea 
              id="example" 
              name="example" 
              value={formData.example} 
              onChange={handleChange} 
              required 
              rows={5}
            />
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
