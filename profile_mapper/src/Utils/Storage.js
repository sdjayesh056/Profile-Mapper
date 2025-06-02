import { profiles as mockData } from "../Data/MockData";

const STORAGE_KEY = "profiles";

export const loadProfiles = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveProfiles = (profiles) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
};

export function seedInitialProfiles() {
  if (!localStorage.getItem("profiles")) {
    localStorage.setItem("profiles", JSON.stringify(mockData));
  }
}
