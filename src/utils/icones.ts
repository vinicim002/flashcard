import {
  BookOpen, Brain, Calculator, FlaskConical, Globe, Music,
  Code, Microscope, Landmark, Dumbbell, Palette, Cpu,
  Languages, Leaf, Scale, Stethoscope, PenTool, Rocket,
  History, Atom,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type IconeOption = {
  nome: string;
  label: string;
  icone: LucideIcon;
};

export const ICONES_MATERIAS: IconeOption[] = [
  { nome: "BookOpen",      label: "Livro",        icone: BookOpen },
  { nome: "Brain",         label: "Mente",        icone: Brain },
  { nome: "Calculator",    label: "Matemática",   icone: Calculator },
  { nome: "FlaskConical",  label: "Química",      icone: FlaskConical },
  { nome: "Globe",         label: "Geografia",    icone: Globe },
  { nome: "Music",         label: "Música",       icone: Music },
  { nome: "Code",          label: "Programação",  icone: Code },
  { nome: "Microscope",    label: "Biologia",     icone: Microscope },
  { nome: "Landmark",      label: "História",     icone: Landmark },
  { nome: "Dumbbell",      label: "Educação Fís.",icone: Dumbbell },
  { nome: "Palette",       label: "Artes",        icone: Palette },
  { nome: "Cpu",           label: "Tecnologia",   icone: Cpu },
  { nome: "Languages",     label: "Idiomas",      icone: Languages },
  { nome: "Leaf",          label: "Biologia",     icone: Leaf },
  { nome: "Scale",         label: "Direito",      icone: Scale },
  { nome: "Stethoscope",   label: "Medicina",     icone: Stethoscope },
  { nome: "PenTool",       label: "Design",       icone: PenTool },
  { nome: "Rocket",        label: "Engenharia",   icone: Rocket },
  { nome: "History",       label: "História",     icone: History },
  { nome: "Atom",          label: "Física",       icone: Atom },
];

export function getIcone(nome: string): LucideIcon {
  return ICONES_MATERIAS.find((i) => i.nome === nome)?.icone ?? BookOpen;
}