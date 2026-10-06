/** Fonctions GLSL partagées : bruit, vagues, caustiques (écrites pour ce projet). */

export const NOISE = /* glsl */ `
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

float hash1(vec2 p) {
  return fract(sin(dot(p, vec2(41.7, 289.3))) * 43758.5453);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash1(i);
  float b = hash1(i + vec2(1.0, 0.0));
  float c = hash1(i + vec2(0.0, 1.0));
  float d = hash1(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
`

/** Gradient d'un champ de vagues (somme d'ondes directionnelles + lente déformation). */
export const WAVES = /* glsl */ `
vec2 waveGradient(vec2 p, float t) {
  vec2 warp = vec2(sin(p.y * 2.3 + t * 0.35), cos(p.x * 1.9 - t * 0.3)) * 0.18;
  p += warp;
  vec2 d1 = vec2(0.94, 0.33);
  vec2 d2 = vec2(-0.41, 0.91);
  vec2 d3 = vec2(0.8, -0.6);
  vec2 d4 = vec2(-0.71, -0.71);
  vec2 g = d1 * cos(dot(p, d1) * 13.0 + t * 1.15);
  g += d2 * cos(dot(p, d2) * 17.0 - t * 1.45) * 0.72;
  g += d3 * cos(dot(p, d3) * 26.0 + t * 1.9) * 0.42;
  g += d4 * cos(dot(p, d4) * 37.0 - t * 2.4) * 0.25;
  return g;
}
`

/** Réseau de caustiques : arêtes d'un Voronoï animé, sur deux échelles. */
export const CAUSTICS = /* glsl */ `
float cellEdge(vec2 x, float t) {
  vec2 n = floor(x);
  vec2 f = fract(x);
  float d1 = 8.0;
  float d2 = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      o = 0.5 + 0.42 * sin(t + 6.2831 * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      if (d < d1) { d2 = d1; d1 = d; }
      else if (d < d2) { d2 = d; }
    }
  }
  return sqrt(d2) - sqrt(d1);
}

float caustics(vec2 p, float t) {
  // Déformation du domaine : les arêtes du Voronoï deviennent des filaments courbes.
  p += 0.38 * vec2(sin(p.y * 1.3 + t * 0.4), cos(p.x * 1.1 - t * 0.35));
  p += 0.16 * vec2(sin(p.y * 3.1 - t * 0.6), cos(p.x * 2.7 + t * 0.5));
  float a = exp(-cellEdge(p, t * 0.8) * 5.2);
  float b = exp(-cellEdge(p * 1.62 + 4.7, t * 1.1) * 6.5);
  return a * 0.7 + b * 0.38;
}
`
