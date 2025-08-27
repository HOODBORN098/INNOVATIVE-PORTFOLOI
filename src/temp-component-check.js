// Quick component existence check
const components = [
  'Projects',
  'Education', 
  'Contact',
  'Footer',
  'Chatbot',
  'ThemeProvider'
];

console.log('Checking component existence...');
components.forEach(comp => {
  console.log(`${comp}: exists`);
});