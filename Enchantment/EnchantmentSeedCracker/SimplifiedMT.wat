(module 
  (memory (export "memory") 1)
  (func $MT (param $seed i32)
    (local.get $seed)
    (call $set_seed)
  )

  (func $set_seed (param $seed i32)
    (local $v0 i32)
    (local $v1 i32)

    ;; off=0, seed
    (i32.const 0)
    (local.get $seed)
    (i32.store)

    ;; mti
    (i32.const 12)
    (local.set $v0)

    ;; off=8, mt[0]
    (i32.const 8)
    (local.get $seed)
    (i32.store)

    (loop $loop0
      ;; Index
      (local.get $v0)

      (local.get $v0)
      (i32.const 4)
      (i32.sub)
      (i32.load)
      (local.tee $v1)
      (i32.const 30)
      (i32.shr_u)
      (local.get $v1)
      (i32.xor)
      (i32.const 1812433253)
      (i32.mul)
      (local.get $v0)
      (i32.const 8)
      (i32.sub)
      (i32.const 2)
      (i32.shr_s)
      (i32.add)
      (i32.store)

      (local.get $v0)
      (i32.const 4)
      (i32.add)
      (local.tee $v0)

      (i32.const 2504)
      (i32.lt_u)
      (br_if $loop0)
    )
    (i32.const 4)
    (local.get $v0)
    (i32.const 8)
    (i32.sub)
    (i32.store)
  )

  (func $random_int (result i32)
    (local $v0 i32)
    (local $v1 i32)
    (local $v2 i32)
    (block $block0
      (i32.const 4)
      (i32.load)
      (i32.const 2496)
      (i32.lt_u)
      (br_if $block0)

      (i32.const 0)
      (local.set $v0)
      (loop $loop0
        (local.get $v0)
        (i32.const 8)
        (i32.add)

        ;; this.mt[i] & 0x80000000
        (local.get $v0)
        (i32.const 8)
        (i32.add)
        (i32.load)
        (i32.const 0x80000000)
        (i32.and)

        ;; this.mt[i + 1] & 0x80000000
        (local.get $v0)
        ;; 4 * (1 + 2)
        (i32.const 12)
        (i32.add)
        (i32.load)
        (i32.const 0x7FFFFFFF)
        (i32.and)

        (i32.add)
        (local.tee $v1)

        (i32.const 1)
        (i32.shr_u)

        (local.get $v0)
        ;; 4 * (397 + 2)
        (i32.const 1596)
        (i32.add)
        (i32.load)
        (i32.xor)
        (local.set $v2)

        (local.get $v1)
        (i32.const 0x1)
        (i32.and)
        (if
          (then
            (local.get $v2)
            (i32.const 0x9908B0DF)
            (i32.xor)
            (local.set $v2)
          )
        )

        (local.get $v2)
        (i32.store)

        (local.get $v0)
        (i32.const 4)
        (i32.add)
        (local.tee $v0)
        ;; 4 * (624 - 397)
        (i32.const 908)
        (i32.lt_u)
        (br_if $loop0)
      )

      (local.get $v0)
      (i32.const 4)
      (i32.sub)
      (local.set $v0)

      (loop $loop1
        (local.get $v0)
        (i32.const 8)
        (i32.add)

        (local.get $v0)
        (i32.const 8)
        (i32.add)
        (i32.load)
        (i32.const 0x80000000)
        (i32.and)

        (local.get $v0)
        (i32.const 12)
        (i32.add)
        (i32.load)
        (i32.const 0x7FFFFFFF)
        (i32.and)

        (i32.add)
        (local.tee $v1)

        (i32.const 1)
        (i32.shr_u)

        (local.get $v0)
        (i32.const 900)
        (i32.sub)
        (i32.load)
        (i32.xor)
        (local.set $v2)

        (local.get $v1)
        (i32.const 0x1)
        (i32.and)
        (if
          (then
            (local.get $v2)
            (i32.const 0x9908B0DF)
            (i32.xor)
            (local.set $v2)
          )
        )

        (local.get $v2)
        (i32.store)

        (local.get $v0)
        (i32.const 4)
        (i32.add)
        (local.tee $v0)
        (i32.const 2492)
        (i32.lt_u)
        (br_if $loop1)
      )

      (i32.const 4)
      (i32.const 0)
      (i32.store)
    )

    (i32.const 2500)

    (i32.const 2500)
    (i32.load)
    (i32.const 0x80000000)
    (i32.and)

    (i32.const 8)
    (i32.load)
    (i32.const 0x7FFFFFFF)
    (i32.and)

    (i32.add)
    (local.tee $v1)

    (i32.const 1)
    (i32.shr_u)

    (i32.const 1592)
    (i32.load)
    (i32.xor)
    (local.set $v2)

    (local.get $v1)
    (i32.const 0x1)
    (i32.and)
    (if
      (then
        (local.get $v2)
        (i32.const 0x9908B0DF)
        (i32.xor)
        (local.set $v2)
      )
    )

    (local.get $v2)
    (i32.store)

    (i32.const 4)

    (i32.const 4)
    (i32.load)

    (i32.const 8)
    (i32.add)
    (local.tee $v0)

    (i32.const 4)
    (i32.sub)
    (i32.store)

    (local.get $v0)
    (i32.load)

    (local.tee $v0)
    (local.get $v0)
    (i32.const 11)
    (i32.shr_u)
    (i32.xor)

    (local.tee $v0)
    (local.get $v0)
    (i32.const 7)
    (i32.shl)
    (i32.const 2636928640)
    (i32.and)
    (i32.xor)

    (local.tee $v0)
    (local.get $v0)
    (i32.const 15)
    (i32.shl)
    (i32.const 4022730752)
    (i32.and)
    (i32.xor)

    (local.tee $v0)
    (local.get $v0)
    (i32.const 18)
    (i32.shr_u)
    (i32.xor)
  )

  (func $nextInt (param $a i32) (result i32)
    (local $v1 i32)
    (call $random_int)
    (local.set $v1)
    (local.get $a)
    (i32.const 0)
    (i32.ne)
    (if
      (then
        (local.get $v1)
        (local.get $a)
        (i32.rem_u)
        (local.set $v1)
      )
    )
    (local.get $v1)
    (i32.const 1)
    (i32.shr_u)
  )
  (export "MT" (func $MT))
  (export "setSeed" (func $set_seed))
  (export "random_int" (func $random_int))
  (export "nextInt" (func $nextInt))
)