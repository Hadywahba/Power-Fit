import type { RegisterFields } from "../schemes/auth/register.schema";

export type RegisterBody = RegisterFields & {
  gender: "male" | "female";
  age: number;
  height: number;
  weight: number;
  goal: "gain weight" | "lose weight" | "get fitter" | "gain more flexible" | "learn the basics";
  activityLevel: "level1" | "level2" | "level3" | "level4" | "level5" ;
};