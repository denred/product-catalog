'use client';
import { useState, useCallback, useMemo } from 'react';
import './styles.scss';
import { clamp } from '../../utils/clamp';
import { formatPrice } from '../../utils/format-price';

interface PriceRangeFilterProps {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  label?: string;
  className?: string;
}

const PriceRangeFilter = ({
  min = 0,
  max = 1000,
  step = 10,
  value = [0, 1000],
  onChange,
  label = 'Price Range',
  className = 'price-range',
}: PriceRangeFilterProps) => {
  const [internalMin, setInternalMin] = useState(value[0]);
  const [internalMax, setInternalMax] = useState(value[1]);

  const handleChange = useCallback(
    (type: 'min' | 'max', raw: string) => {
      if (raw === '') return;

      const num = Number(raw);
      if (Number.isNaN(num)) return;

      if (type === 'min') {
        const newMin = clamp(num, min, internalMax - step);
        setInternalMin(newMin);
        onChange?.([newMin, internalMax]);
      } else {
        const newMax = clamp(num, internalMin + step, max);
        setInternalMax(newMax);
        onChange?.([internalMin, newMax]);
      }
    },
    [internalMin, internalMax, min, max, step, onChange]
  );

  const trackStyle = useMemo(() => {
    const leftPercent = ((internalMin - min) / (max - min)) * 100;
    const widthPercent = ((internalMax - internalMin) / (max - min)) * 100;

    return {
      left: `${leftPercent <= 0.0001 ? 0 : leftPercent}%`,
      width: `${widthPercent >= 99.999 ? 100 : widthPercent}%`,
    };
  }, [internalMin, internalMax, min, max]);

  return (
    <div className={className}>
      <h3 className="price-label" id="price-label">
        {label}
      </h3>

      <div className="price-inputs">
        <input
          type="number"
          aria-label="Minimum price"
          min={min}
          max={internalMax - step}
          step={step}
          value={internalMin}
          onChange={(e) => handleChange('min', e.target.value)}
          className="price-input"
        />
        <span className="price-dash">–</span>
        <input
          type="number"
          aria-label="Maximum price"
          min={internalMin}
          max={max}
          step={step}
          value={internalMax}
          onChange={(e) => handleChange('max', e.target.value)}
          className="price-input"
        />
      </div>

      <div className="slider-wrapper">
        <div className="range-track" style={trackStyle} />
        <input
          type="range"
          aria-labelledby="price-label"
          min={min}
          max={max}
          step={step}
          value={internalMin}
          onChange={(e) => handleChange('min', e.target.value)}
          className="slider slider-min"
        />
        <input
          type="range"
          aria-labelledby="price-label"
          min={min}
          max={max}
          step={step}
          value={internalMax}
          onChange={(e) => handleChange('max', e.target.value)}
          className="slider slider-max"
        />
      </div>

      <div className="price-values">
        <span>{formatPrice(internalMin, max)}</span>
        <span>{formatPrice(internalMax, max, true)}</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
