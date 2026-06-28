// The single source of truth for the board and the map.
// label       = short text shown on the board square
// description = "Do {activity} at {location}" line, used for popups + aria-labels
// Coordinates are representative Front Range locations.
export const activities = [
  { id: 'red-rocks', label: 'Red Rocks', description: 'Hike the Famous Red Rocks Amphitheatre', url: 'https://www.redrocksonline.com/', lat: 39.6655, lng: -105.2057 },
  { id: 'cart-driver', label: 'Cart Driver', description: 'Grab a Slice at Cart Driver in RiNo', url: 'https://www.cart-driver.com/rino', lat: 39.7616, lng: -104.9810 },
  { id: 'butterfly-pavilion', label: 'Butterfly Pav.', description: 'See the butterflies at the Butterfly Pavilion', url: 'https://butterflies.org/', lat: 39.8663, lng: -105.0566 },
  { id: 'childrens-museum', label: 'Kids Museum', description: "Play at the Children's Museum of Denver", url: 'https://www.mychildsmuseum.org/', lat: 39.7494, lng: -105.0083 },
  { id: 'pearl-street', label: 'Pearl Street', description: 'Walk Pearl Street in Boulder', url: 'https://boulderdowntown.com/', lat: 40.0190, lng: -105.2786 },
  { id: 'chautauqua', label: 'Chautauqua', description: 'Picnic at Chautauqua Park in Boulder', url: 'https://bouldercolorado.gov/locations/chautauqua-park', lat: 39.9994, lng: -105.2811 },
  { id: 'lookout-mountain', label: 'Lookout Mtn', description: 'Drive up to Windy Saddle Lookout in Golden', url: 'https://www.visitgolden.com/things-to-do/attractions/lookout-mountain/', lat: 39.7339, lng: -105.2418 },
  { id: 'sunrise-amphitheatre', label: 'Sunrise Amph.', description: 'Watch the sunrise at Sunrise Amphitheatre', url: 'https://www.tclf.org/landscapes/sunrise-circle-amphitheater', lat: 39.9981, lng: -105.2970 },
  { id: 'willow-creek', label: 'Willow Creek', description: 'Eat lunch at Willow Creek in Evergreen', url: 'https://www.willowcreekevergreen.com/', lat: 39.6336, lng: -105.3200 },
  { id: 'sloans-lake', label: "Sloan's Lake", description: "Walk around Sloan's Lake", url: 'https://visitdenver.com/blog/post/sloan-lake/', lat: 39.7503, lng: -105.0533 },
  { id: 'olde-town-arvada', label: 'Olde Town', description: 'Have dinner in Olde Town Arvada', url: 'https://www.oldetownarvada.org/', lat: 39.8019, lng: -105.0869 },
  { id: 'casa-bonita', label: 'Casa Bonita', description: 'Watch the Cliff Divers at Casa Bonita', url: 'https://www.casabonitadenver.com/', lat: 39.7414, lng: -105.0701 },
  { id: 'golden-mill', label: 'Golden Mill', description: 'Hang by the river at The Golden Mill in Golden', url: 'https://www.thegoldenmill.com/', lat: 39.7558, lng: -105.2246 },
  { id: 'cherry-creek', label: 'Cherry Creek', description: 'Go shopping at Cherry Creek Mall', url: 'https://www.simon.com/mall/cherry-creek-shopping-center', lat: 39.7186, lng: -104.9534 },
  { id: 'sixteenth-street', label: '16th Street', description: 'Walk the 16th Street Mall', url: 'https://www.the16thstreetmall.com/', lat: 39.7466, lng: -104.9922 },
  { id: 'little-man', label: 'Little Man', description: 'Grab a Scoop of ice cream at Little Man', url: 'https://www.littlemanicecream.com/', lat: 39.7626, lng: -105.0079 },
];
