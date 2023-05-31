// export const fragmentShader = `
// uniform sampler2D globeTexture;

// varying vec2 vertexUV;
// varying vec3 vertexNormal;

// void main(){
//   float intensity = 0.5 - dot(vertexNormal, vec3(0.0, 0.0, 0.5));
//   vec3 atmosphere = vec3(0, 0, 0) * pow(intensity,0.2);

//   gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);
// }
// `;
// export const vertexShader = `
// varying vec2 vertexUV;
// varying vec3 vertexNormal;

// void main() {
//   vertexUV = uv;
//   vertexNormal = normal;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
// `;

export const vertexAtmosphere = `
varying vec3 vertexNormal;

void main() {
  vertexNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.72);
} 
`;
export const fragmentAtmosphere = `
varying vec3 vertexNormal;

void main(){
  float intensity = pow(.57 - dot(vertexNormal, vec3(0, 0, 1)), 6.3);
  gl_FragColor = vec4( 0.35, 0.73, 0.83, 0.5) * intensity;
}
`;
