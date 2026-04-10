const fs = require('fs');

const brands = [
  { name: 'Eastern', color: '#E31837' },
  { name: 'Double Horse', color: '#D2232A' },
  { name: 'Ajmi', color: '#00843D' },
  { name: 'Kitchen Treasures', color: '#FF7F00' },
  { name: 'Brahmins', color: '#E22028' },
  { name: 'India Gate', color: '#1B3E7A' },
  { name: 'Periyar', color: '#C8102E' },
  { name: 'Nirapara', color: '#007A33' },
  { name: 'AVT', color: '#DA291C' },
  { name: 'Tilda', color: '#0A2240' }
];

brands.forEach(brand => {
  const filename = `public/brands/${brand.name.toLowerCase().replace(/ /g, '-')}.svg`;
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="100%" height="100%">
  <rect width="400" height="200" fill="white" />
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="48" font-weight="900" font-style="italic" fill="${brand.color}" letter-spacing="-1">${brand.name.toUpperCase()}</text>
  <path d="M 50 160 L 350 160" stroke="${brand.color}" stroke-width="4" stroke-linecap="round" opacity="0.5" />
</svg>`;

  fs.writeFileSync(filename, svg);
  console.log(`Generated ${filename}`);
});
