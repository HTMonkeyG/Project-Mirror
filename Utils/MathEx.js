/**
 * Adapted from Mth.java
 */

var Mth = {
  __proto__: Math,
  clamp(n, n2, n3) {
    return Math.min(Math.max(n, n2), n3);
  },
  clampedLerp(d, d2, d3) {
    if (d < 0.0)
      return d2;
    if (d > 1.0)
      return d3;
    return Mth.lerp(d, d2, d3);
  },
  absMax(d, d2) {
    if (d < 0.0) {
      d = -d;
    }
    if (d2 < 0.0) {
      d2 = -d2;
    }
    return Mth.max(d, d2);
  },
  floorDiv(n, n2) {
    return Mth.floor(n / n2);
  },
  equal(d, d2) {
    return Mth.abs(d2 - d) < 9.999999747378752E-6;
  },
  positiveModulo(d, d2) {
    return (d % d2 + d2) % d2;
  },
  isMultipleOf(n, n2) {
    return n % n2 == 0;
  },
  wrapDegrees(d) {
    var d2 = d % 360.0;
    if (d2 >= 180.0) {
      d2 -= 360.0;
    }
    if (d2 < -180.0) {
      d2 += 360.0;
    }
    return d2;
  },
  degreesDifference(f, f2) {
    return Mth.wrapDegrees(f2 - f);
  },
  degreesDifferenceAbs(f, f2) {
    return Mth.abs(Mth.degreesDifference(f, f2));
  },
  rotateIfNecessary(f, f2, f3) {
    var f4 = Mth.degreesDifference(f, f2)
      , f5 = Mth.clamp(f4, -f3, f3);
    return f2 - f5;
  },

  approach(f, f2, f3) {
    f3 = Mth.abs(f3);
    if (f < f2)
      return Mth.clamp(f + f3, f, f2);
    return Mth.clamp(f - f3, f2, f);
  },
  approachDegrees(f, f2, f3) {
    var f4 = Mth.degreesDifference(f, f2);
    return Mth.approach(f, f + f4, f3);
  },
  getInt(string, n) {
    return Number.parseInt(string, n);
  },
  smallestEncompassingPowerOfTwo(n) {
    var n2 = n - 1;
    n2 |= n2 >> 1;
    n2 |= n2 >> 2;
    n2 |= n2 >> 4;
    n2 |= n2 >> 8;
    n2 |= n2 >> 16;
    return n2 + 1;
  },
  isPowerOfTwo(n) {
    return n != 0 && (n & n - 1) == 0;
  },
  /*
    public int ceillog2(int n) {
    n = Mth.isPowerOfTwo(n) ? n : Mth.smallestEncompassingPowerOfTwo(n);
    return MULTIPLY_DE_BRUIJN_BIT_POSITION[(int)((long)n * 125613361L >> 27) & 0x1F];
  }
  
    public int log2(int n) {
    return Mth.ceillog2(n) - (Mth.isPowerOfTwo(n) ? 0 : 1);
  }
  
    public int color(float f, float f2, float f3) {
    return FastColor.ARGB32.color(0, Mth.floor(f * 255.0f), Mth.floor(f2 * 255.0f), Mth.floor(f3 * 255.0f));
  }
  
    public float frac(float f) {
    return f - (float)Mth.floor(f);
  }
  
    public double frac(double d) {
    return d - (double)Mth.lfloor(d);
  }
  
    @Deprecated
public  long getSeed(Vec3i vec3i) {
  return Mth.getSeed(vec3i.getX(), vec3i.getY(), vec3i.getZ());
}

@Deprecated
public  long getSeed(int n, int n2, int n3) {
          long l = (long)(n * 3129871) ^ (long)n3 * 116129781L ^ (long)n2;
  l = l * l * 42317861L + l * 11L;
  return l >> 16;
}
  
    public  UUID createInsecureUUID(RandomSource randomSource) {
          long l = randomSource.nextLong() & 0xFFFFFFFFFFFF0FFFL | 0x4000L;
          long l2 = randomSource.nextLong() & 0x3FFFFFFFFFFFFFFFL | Long.MIN_VALUE;
  return new UUID(l, l2);
}
  
    public  UUID createInsecureUUID() {
  return Mth.createInsecureUUID(RANDOM);
}
  */
  inverseLerp(d, d2, d3) {
    return (d - d2) / (d3 - d2);
  },
  /*
    public  boolean rayIntersectsAABB(Vec3 vec3, Vec3 vec32, AABB aABB) {
            double d = (aABB.minX + aABB.maxX) * 0.5;
            double d2 = (aABB.maxX - aABB.minX) * 0.5;
            double d3 = vec3.x - d;
      if (Math.abs(d3) > d2 && d3 * vec32.x >= 0.0) {
        return false;
      }
            double d4 = (aABB.minY + aABB.maxY) * 0.5;
            double d5 = (aABB.maxY - aABB.minY) * 0.5;
            double d6 = vec3.y - d4;
      if (Math.abs(d6) > d5 && d6 * vec32.y >= 0.0) {
        return false;
      }
            double d7 = (aABB.minZ + aABB.maxZ) * 0.5;
            double d8 = (aABB.maxZ - aABB.minZ) * 0.5;
            double d9 = vec3.z - d7;
      if (Math.abs(d9) > d8 && d9 * vec32.z >= 0.0) {
        return false;
      }
            double d10 = Math.abs(vec32.x);
            double d11 = Math.abs(vec32.y);
            double d12 = Math.abs(vec32.z);
            double d13 = vec32.y * d9 - vec32.z * d6;
      if (Math.abs(d13) > d5 * d12 + d8 * d11) {
        return false;
      }
      d13 = vec32.z * d3 - vec32.x * d9;
      if (Math.abs(d13) > d2 * d12 + d8 * d10) {
        return false;
      }
      d13 = vec32.x * d6 - vec32.y * d3;
      return Math.abs(d13) < d2 * d11 + d5 * d10;
    }
    /*
      public  double atan2(double d, double d2) {
            boolean bl;
            double d3;
            boolean bl2;
            boolean bl3;
            double d4 = d2 * d2 + d * d;
        if (Double.isNaN(d4)) {
          return Double.NaN;
        }
            boolean bl4 = bl = d < 0.0;
        if (bl) {
          d = -d;
        }
            boolean bl5 = bl3 = d2 < 0.0;
        if (bl3) {
          d2 = -d2;
        }
            boolean bl6 = bl2 = d > d2;
        if (bl2) {
          d3 = d2;
          d2 = d;
          d = d3;
        }
        d3 = Mth.fastInvSqrt(d4);
            double d5 = FRAC_BIAS + (d *= d3);
            int n = (int)Double.doubleToRawLongBits(d5);
            double d6 = ASIN_TAB[n];
            double d7 = COS_TAB[n];
            double d8 = d5 - FRAC_BIAS;
            double d9 = d * d7 - (d2 *= d3) * d8;
            double d10 = (6.0 + d9 * d9) * d9 * 0.16666666666666666;
            double d11 = d6 + d10;
        if (bl2) {
          d11 = 1.5707963267948966 - d11;
        }
        if (bl3) {
          d11 = 3.141592653589793 - d11;
        }
        if (bl) {
          d11 = -d11;
        }
        return d11;
      }
    
      public  int hsvToRgb(float f, float f2, float f3) {
            float f4;
            float f5;
            int n = (int)(f * 6.0f) % 6;
            float f6 = f * 6.0f - (float)n;
            float f7 = f3 * (1.0f - f2);
            float f8 = f3 * (1.0f - f6 * f2);
            float f9 = f3 * (1.0f - (1.0f - f6) * f2);
            float f10 = switch (n) {
          case 0 -> {
            f4 = f3;
            f5 = f9;
            break f7;
          }
                case 1 -> {
            f4 = f8;
            f5 = f3;
            break f7;
          }
                case 2 -> {
            f4 = f7;
            f5 = f3;
            break f9;
          }
                case 3 -> {
            f4 = f7;
            f5 = f8;
            break f3;
          }
                case 4 -> {
            f4 = f9;
            f5 = f7;
            break f3;
          }
                case 5 -> {
            f4 = f3;
            f5 = f7;
            break f8;
          }
                default -> throw new java.lang.RuntimeException("Something went wrong when converting from HSV to RGB. Input was " + f + ", " + f2 + ", " + f3);
        };
        return FastColor.ARGB32.color(0, Mth.clamp((int)(f4 * 255.0f), 0, 255), Mth.clamp((int)(f5 * 255.0f), 0, 255), Mth.clamp((int)(f10 * 255.0f), 0, 255));
      }
    
      public  int murmurHash3Mixer(int n) {
        n ^= n >>> 16;
        n *= -2048144789;
        n ^= n >>> 13;
        n *= -1028477387;
        n ^= n >>> 16;
        return n;
      }
    
      public  int binarySearch(int n, int n2, IntPredicate intPredicate) {
            int n3 = n2 - n;
        while (n3 > 0) {
                int n4 = n3 / 2;
                int n5 = n + n4;
          if (intPredicate.test(n5)) {
            n3 = n4;
            continue;
          }
          n = n5 + 1;
          n3 -= n4 + 1;
        }
        return n;
      }*/

  lerpInt(f, n, n2) {
    return n + Math.floor(f * (n2 - n));
  },

  lerpDiscrete(f, n, n2) {
    var n3 = n2 - n;
    return n + Math.floor(f * (n3 - 1)) + (f > 0.0 ? 1 : 0);
  },

  lerp(f, f2, f3) {
    return f2 + f * (f3 - f2);
  },

  lerp2(d, d2, d3, d4, d5, d6) {
    return Mth.lerp(d2, Mth.lerp(d, d3, d4), Mth.lerp(d, d5, d6));
  },

  lerp3(d, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11) {
    return Mth.lerp(d3, Mth.lerp2(d, d2, d4, d5, d6, d7), Mth.lerp2(d, d2, d8, d9, d10, d11));
  },

  catmullrom(f, f2, f3, f4, f5) {
    return 0.5 * (2.0 * f3 + (f4 - f2) * f + (2.0 * f2 - 5.0 * f3 + 4.0 * f4 - f5) * f * f + (3.0 * f3 - f2 - 3.0 * f4 + f5) * f * f * f);
  },

  smoothstep(d) {
    return d * d * d * (d * (d * 6.0 - 15.0) + 10.0);
  },

  smoothstepDerivative(d) {
    return 30.0 * d * d * (d - 1.0) * (d - 1.0);
  },

  sign(d) {
    if (d == 0.0) {
      return 0;
    }
    return d > 0.0 ? 1 : -1;
  },

  rotLerp(f, f2, f3) {
    return f2 + f * Mth.wrapDegrees(f3 - f2);
  },

  rotLerp(d, d2, d3) {
    return d2 + d * Mth.wrapDegrees(d3 - d2);
  },

  triangleWave(f, f2) {
    return (Math.abs(f % f2 - f2 * 0.5) - f2 * 0.25) / (f2 * 0.25);
  },

  square(f) {
    return f * f;
  },

  clampedMap(d, d2, d3, d4, d5) {
    return Mth.clampedLerp(d4, d5, Mth.inverseLerp(d, d2, d3));
  },

  map(d, d2, d3, d4, d5) {
    return Mth.lerp(Mth.inverseLerp(d, d2, d3), d4, d5);
  },

  /*
    public  double wobble(double d) {
      return d + (2.0 * RandomSource.create(Mth.floor(d * 3000.0)).nextDouble() - 1.0) * 1.0E-7 / 2.0;
    }
  
    public  int roundToward(int n, int n2) {
      return Mth.positiveCeilDiv(n, n2) * n2;
    }
  
    public  int positiveCeilDiv(int n, int n2) {
      return -Math.floorDiv(-n, n2);
    }*/

  randomBetweenInclusive(randomSource, n, n2) {
    return randomSource.nextInt(n2 - n + 1) + n;
  },
  randomBetween(randomSource, f, f2) {
    return randomSource.nextFloat() * (f2 - f) + f;
  },
  normal(randomSource, f, f2) {
    return f + randomSource.nextGaussian() * f2;
  },
  lengthSquared() {
    return Mth.hypot(...arguments) ** 2
  },
  length() {
    return Mth.hypot(...arguments);
  },
  quantize(d, n) {
    return Mth.floor(d / n) * n;
  },
  /*
    public  IntStream outFromOrigin(int n, int n2, int n3) {
      return Mth.outFromOrigin(n, n2, n3, 1);
    }
  
    public  IntStream outFromOrigin(int n, int n2, int n3, int n6) {
      if (n2 > n3) {
        throw new IllegalArgumentException(String.format(Locale.ROOT, "upperbound %d expected to be > lowerBound %d", n3, n2));
      }
      if (n6 < 1) {
        throw new IllegalArgumentException(String.format(Locale.ROOT, "steps expected to be >= 1, was %d", n6));
      }
      if (n < n2 || n > n3) {
        return IntStream.empty();
      }
      return IntStream.iterate((int)n, n4 -> {
        int n5 = Math.abs(n - n4);
        return n - n5 >= n2 || n + n5 <= n3;
      }, n5 -> {
        int n6;
        boolean bl;
        boolean bl2 = n5 <= n;
        int n7 = Math.abs(n - n5);
        boolean bl3 = bl = n + n7 + n6 <= n3;
        if(!(bl2 && bl || (n6 = n - n7 - (bl2 ? n6 : 0)) < n2)) {
        return n6;
      }
      return n + n7 + n6;
    });
  }
  
      public  Quaternionf rotationAroundAxis(Vector3f vector3f, Quaternionf quaternionf, Quaternionf quaternionf2) {
          float f = vector3f.dot(quaternionf.x, quaternionf.y, quaternionf.z);
    return quaternionf2.set(vector3f.x * f, vector3f.y * f, vector3f.z * f, quaternionf.w).normalize();
  }
  
       {
    for (int i = 0; i < 257; ++i) {
              double d = (double)i / 256.0;
              double d2 = Math.asin(d);
      Mth.COS_TAB[i] = Math.cos(d2);
      Mth.ASIN_TAB[i] = d2;
    }
  }*/
}

module.exports = Mth;