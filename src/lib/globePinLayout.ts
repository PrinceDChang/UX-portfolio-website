/**
 * Globe pin lat/lng — spread for visual separation on the dotted globe.
 * City/location labels on cards stay tied to each project's real context.
 */
export const globePinCoordinates: Record<
  string,
  { lat: number; lng: number }
> = {
  cue: { lat: 51.51, lng: -0.13 },
  coplan: { lat: 35.86, lng: 104.19 },
  sushitalk: { lat: 35.68, lng: 139.69 },
  wa211: { lat: 40.71, lng: -74.01 },
  'uw-oris': { lat: 47.61, lng: -122.33 },
  citbridge: { lat: 52, lng: -2 },
  'competition-king': { lat: 34, lng: 132 },
  arboretum: { lat: 40, lng: -68 },
}
