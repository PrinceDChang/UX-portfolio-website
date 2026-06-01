/**
 * Globe pin lat/lng — spread for visual separation on the dotted globe.
 * City/location labels on cards stay tied to each project's real context.
 */
export const globePinCoordinates: Record<
  string,
  { lat: number; lng: number }
> = {
  cue: { lat: 28, lng: -98 },
  coplan: { lat: -18, lng: -52 },
  sushitalk: { lat: 10, lng: 98 },
  wa211: { lat: 48, lng: 12 },
  'uw-oris': { lat: 58, lng: -108 },
  citbridge: { lat: 52, lng: -2 },
  'competition-king': { lat: 34, lng: 132 },
  arboretum: { lat: 40, lng: -68 },
}
