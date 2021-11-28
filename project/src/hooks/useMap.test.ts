import { renderHook } from '@testing-library/react-hooks';
import useMap from './useMap';

describe('Hook: useMap', () => {
  it('should return null if refElement = null', () => {
    const location = {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 10,
    };
    const ref = {
      current: null as any,
    };

    const { result } = renderHook(() => useMap(ref, location));

    expect(result.current).toBe(null);
  });
});
