import type { IconType } from "react-icons";
import {
  FaEnvelope,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaDev,
} from "react-icons/fa";
import { SiDiscord, SiTelegram } from "react-icons/si";

const socialIconMap: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  x: FaTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
  dev: FaDev,
  discord: SiDiscord,
  telegram: SiTelegram,
  email: FaEnvelope,
  website: FaGlobe,
};

export function getSocialIcon(iconKey: string): IconType {
  return socialIconMap[iconKey.toLowerCase()] ?? FaGlobe;
}
