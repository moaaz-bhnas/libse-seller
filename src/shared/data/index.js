export const title = "Libse Seller";

export const categories = [
  {
    name_en: "Men",
    name_ar: "رجالي",
    subCategories: [
      {
        name_en: "Pants",
        name_ar: "بنطلونات",
        groups: [
          {
            name_en: "Sweatpants",
            name_ar: "بنطلونات رياضية",
            details: [
              {
                name_en: "Style",
                name_ar: "الستايل",
                options: [
                  { name_en: "Drawstring", name_ar: "برباط" },
                  { name_en: "Comfort Fit", name_ar: "قصة مريحة" },
                  { name_en: "Stright", name_ar: "قصة مستقيمة" },
                  { name_en: "Skinny", name_ar: "سكيني" },
                  { name_en: "Slim", name_ar: "قصة ضيقة" },
                  { name_en: "Other", name_ar: "أخرى" },
                ],
                required: true,
              },
              {
                name_en: "Material",
                name_ar: "مواد الملابس",
                options: [
                  { name_en: "Fleece", name_ar: "فليس" },
                  { name_en: "Cotton", name_ar: "قطن" },
                  { name_en: "Nylon", name_ar: "نيلون" },
                  { name_en: "Polyester", name_ar: "بوليستر" },
                  { name_en: "Spandex", name_ar: "دنه" },
                  { name_en: "Cashmere", name_ar: "كاشمير" },
                  { name_en: "Jersey", name_ar: "جيرزي" },
                  { name_en: "Linen", name_ar: "كتان" },
                  { name_en: "Other", name_ar: "أخرى" },
                ],
                required: true,
              },
            ],
          },
          {
            name_en: "Jeans",
            name_ar: "جينز",
            details: [
              {
                name_en: "Fit",
                name_ar: "القَصة",
                options: [
                  { name_en: "Stright", name_ar: "قصة مستقيمة" },
                  { name_en: "Slim", name_ar: "قصة ضيقة" },
                  { name_en: "Skinny", name_ar: "سكيني" },
                  { name_en: "Relaxed", name_ar: "قصة مريحة" },
                  { name_en: "Bootcut", name_ar: "بوت كات" },
                ],
                required: true,
              },
              {
                name_en: "Stretch",
                name_ar: "قابلية التمدد",
                options: [
                  { name_en: "Stretch", name_ar: "قابل للتمدد" },
                  { name_en: "Non Stretch", name_ar: "غير قابل للتمدد" },
                ],
                required: true,
              },
            ],
          },
          {
            name_en: "Cargo",
            name_ar: "كارجو",
            details: [
              {
                name_en: "Fit",
                name_ar: "القَصة",
                options: [
                  { name_en: "Stright", name_ar: "قصة مستقيمة" },
                  { name_en: "Slim", name_ar: "قصة ضيقة" },
                ],
                required: true,
              },
              {
                name_en: "Stretch",
                name_ar: "قابلية التمدد",
                options: [
                  { name_en: "Stretch", name_ar: "قابل للتمدد" },
                  { name_en: "Non Stretch", name_ar: "غير قابل للتمدد" },
                ],
                required: true,
              },
            ],
          },
          {
            name_en: "Chino",
            name_ar: "تشينو",
            details: [
              {
                name_en: "Fit",
                name_ar: "القَصة",
                options: [
                  { name_en: "Stright", name_ar: "قصة مستقيمة" },
                  { name_en: "Slim", name_ar: "قصة ضيقة" },
                  { name_en: "Skinny", name_ar: "سكيني" },
                ],
                required: true,
              },
              {
                name_en: "Stretch",
                name_ar: "قابلية التمدد",
                options: [
                  { name_en: "Stretch", name_ar: "قابل للتمدد" },
                  { name_en: "Non Stretch", name_ar: "غير قابل للتمدد" },
                ],
                required: true,
              },
            ],
          },
          {
            name_en: "Pleated Pants",
            name_ar: "مطوي",
            details: [
              {
                name_en: "Fit",
                name_ar: "القَصة",
                options: [
                  { name_en: "Classic", name_ar: "كلاسيك" },
                  { name_en: "Slim", name_ar: "قصة ضيقة" },
                ],
                required: true,
              },
              {
                name_en: "Material",
                name_ar: "مواد الملابس",
                options: [
                  { name_en: "Cotton", name_ar: "قطن" },
                  { name_en: "Denim", name_ar: "دينم" },
                  { name_en: "Leather", name_ar: "جلد" },
                  { name_en: "Linen", name_ar: "كتان" },
                  { name_en: "Other", name_ar: "أخرى" },
                ],
                required: true,
              },
            ],
          },
          {
            name_en: "Khaki",
            name_ar: "كاكي",
            details: [
              {
                name_en: "Fit",
                name_ar: "القَصة",
                options: [
                  { name_en: "Stright", name_ar: "قصة مستقيمة" },
                  { name_en: "Slim", name_ar: "قصة ضيقة" },
                  { name_en: "Skinny", name_ar: "سكيني" },
                  { name_en: "Relaxed", name_ar: "قصة مريحة" },
                ],
                required: true,
              },
            ],
          },
        ],
      },
      // {
      //   name_en: "Shorts",
      //   value: "shorts",
      //   groups: [
      //     {
      //       name_en: "Sweatshorts",
      //       value: "sweetshorts",
      //       details: [
      //         {
      //           name_en: "Material",
      //           value: "material",
      //           options: [
      //             { name_en: "Fleece", value: "fleece" },
      //             { name_en: "Cotton", value: "cotton" },
      //             { name_en: "Nylon", value: "nylon" },
      //             { name_en: "Polyester", value: "polyester" },
      //             { name_en: "Spandex", value: "spandex" },
      //             { name_en: "Cashmere", value: "cashmere" },
      //             { name_en: "Jersey", value: "jersey" },
      //             { name_en: "Linen", value: "linen" },
      //             { name_en: "Other", value: "other" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Jeans",
      //       value: "jeans",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Tapered", value: "tapered" },
      //             { name_en: "Relaxed", value: "relaxed" },
      //             { name_en: "Slim", value: "slim" },
      //             { name_en: "Skinny", value: "skinny" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Stretch",
      //           value: "stretch",
      //           options: [
      //             { name_en: "Stretch", value: "stretch" },
      //             { name_en: "Non Stretch", value: "non-stretch" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Closure",
      //           value: "closure",
      //           options: [
      //             { name_en: "Button Fly", value: "button-fly" },
      //             { name_en: "Zip", value: "zip" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Cargo",
      //       value: "cargo",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Straight", value: "straight" },
      //             { name_en: "Tapered", value: "tapered" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Stretch",
      //           value: "stretch",
      //           options: [
      //             { name_en: "Stretch", value: "stretch" },
      //             { name_en: "Non Stretch", value: "non-stretch" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Closure",
      //           value: "closure",
      //           options: [
      //             { name_en: "Button Fly", value: "button-fly" },
      //             { name_en: "Zip", value: "zip" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Chino",
      //       value: "chino",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "Regular" },
      //             { name_en: "Tapered", value: "tapered" },
      //             { name_en: "Slim", value: "slim" },
      //             { name_en: "Skinny", value: "skinny" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Stretch",
      //           value: "stretch",
      //           options: [
      //             { name_en: "Stretch", value: "stretch" },
      //             { name_en: "Non Stretch", value: "non-stretch" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Closure",
      //           value: "closure",
      //           options: [
      //             { name_en: "Button Fly", value: "button-fly" },
      //             { name_en: "Zip", value: "zip" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Pleated Pants",
      //       value: "pleated-pants",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Tapered", value: "tapered" },
      //             { name_en: "Relaxed", value: "relaxed" },
      //             { name_en: "Slim", value: "slim" },
      //             { name_en: "Skinny", value: "skinny" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Closure",
      //           value: "closure",
      //           options: [
      //             { name_en: "Button Fly", value: "button-fly" },
      //             { name_en: "Zip", value: "zip" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Khaki",
      //       value: "khaki",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Tapered", value: "tapered" },
      //             { name_en: "Relaxed", value: "relaxed" },
      //             { name_en: "Slim", value: "slim" },
      //             { name_en: "Skinny", value: "skinny" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Closure",
      //           value: "closure",
      //           options: [
      //             { name_en: "Button Fly", value: "button-fly" },
      //             { name_en: "Zip", value: "zip" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   name_en: "T-shirts & Tanks",
      //   value: "t-shirts-&-tanks",
      //   groups: [
      //     {
      //       name_en: "Tanks",
      //       value: "tanks",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Relaxed", value: "relaxed" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Stripped", value: "striped" },
      //             { name_en: "Floral", value: "floral" },
      //             { name_en: "Graphic Print", value: "graphic-print" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Occasion",
      //           value: "occasion",
      //           options: [
      //             { name_en: "Casual", value: "casual" },
      //             { name_en: "Sport", value: "sport" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "T-shirts",
      //       value: "t-shirts",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Relaxed", value: "relaxed" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Stripped", value: "striped" },
      //             { name_en: "Floral", value: "floral" },
      //             { name_en: "Graphic Print", value: "graphic-print" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Neckline",
      //           value: "neckline",
      //           options: [
      //             { name_en: "Round", value: "round" },
      //             { name_en: "V", value: "v" },
      //             { name_en: "Crew", value: "crew" },
      //             { name_en: "Low Cut", value: "low-cut" },
      //             { name_en: "Henley", value: "henley" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Occasion",
      //           value: "occasion",
      //           options: [
      //             { name_en: "Casual", value: "casual" },
      //             { name_en: "Sport", value: "sport" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Long Sleeves",
      //       value: "long-sleeves",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Relaxed", value: "relaxed" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Stripped", value: "striped" },
      //             { name_en: "Floral", value: "floral" },
      //             { name_en: "Graphic Print", value: "graphic-print" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Neckline",
      //           value: "neckline",
      //           options: [
      //             { name_en: "Round", value: "round" },
      //             { name_en: "V", value: "v" },
      //             { name_en: "Crew", value: "crew" },
      //             { name_en: "Low Cut", value: "low-cut" },
      //             { name_en: "Henley", value: "henley" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Occasion",
      //           value: "occasion",
      //           options: [
      //             { name_en: "Casual", value: "casual" },
      //             { name_en: "Sport", value: "sport" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Polo",
      //       value: "polo",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Stripped", value: "striped" },
      //             { name_en: "Floral", value: "floral" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Basics",
      //       value: "basics",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Relaxed", value: "relaxed" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Stripped", value: "striped" },
      //             { name_en: "Floral", value: "floral" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Neckline",
      //           value: "neckline",
      //           options: [
      //             { name_en: "Round", value: "round" },
      //             { name_en: "V", value: "v" },
      //             { name_en: "Crew", value: "crew" },
      //             { name_en: "Low Cut", value: "low-cut" },
      //             { name_en: "Henley", value: "henley" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   name_en: "Shirts",
      //   value: "shirts",
      //   groups: [
      //     {
      //       name_en: "Casual",
      //       value: "casual",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Relaxed", value: "relaxed" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Stripped", value: "striped" },
      //             { name_en: "Floral", value: "floral" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Sleeve Length",
      //           value: "sleeve-length",
      //           options: [
      //             { name_en: "Short", value: "short" },
      //             { name_en: "Long", value: "long" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Dressed",
      //       value: "dressed",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Dotted", value: "dotted" },
      //             { name_en: "Stripped", value: "striped" },
      //             { name_en: "Checked", value: "checked" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Sleeve Length",
      //           value: "sleeve-length",
      //           options: [
      //             { name_en: "Short", value: "short" },
      //             { name_en: "Long", value: "long" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Denim",
      //       value: "denim",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Relaxed", value: "relaxed" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Sleeve Length",
      //           value: "sleeve-length",
      //           options: [
      //             { name_en: "Short", value: "short" },
      //             { name_en: "Long", value: "long" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   name_en: "Hoodies & Sweatshirts",
      //   value: "hoodies-&-sweatshirts",
      //   groups: [
      //     {
      //       name_en: "Hoodies",
      //       value: "hoodies",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Relaxed", value: "relaxed" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Color Block", value: "color-block" },
      //             { name_en: "Logo", value: "logo" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Floral", value: "floral" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Sleeve Length",
      //           value: "sleeve-length",
      //           options: [
      //             { name_en: "Long", value: "long" },
      //             { name_en: "Sleeveless", value: "sleeveless" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Occasion",
      //           value: "occasion",
      //           options: [
      //             { name_en: "Casual", value: "casual" },
      //             { name_en: "Sport", value: "sport" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Sweatshirts",
      //       value: "sweatshirts",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Relaxed", value: "relaxed" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Color Block", value: "color-block" },
      //             { name_en: "Logo", value: "logo" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Floral", value: "floral" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Occasion",
      //           value: "occasion",
      //           options: [
      //             { name_en: "Casual", value: "casual" },
      //             { name_en: "Sport", value: "sport" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   name_en: "Jackets & Coats",
      //   value: "jackets-&-coats",
      //   groups: [
      //     {
      //       name_en: "Casual Jackets",
      //       value: "casual-jackets",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Relaxed", value: "relaxed" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Color Block", value: "color-block" },
      //             { name_en: "Logo", value: "logo" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Floral", value: "floral" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Sport Jackets",
      //       value: "sport-jackets",
      //       details: [
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Color Block", value: "color-block" },
      //             { name_en: "Logo", value: "logo" },
      //             { name_en: "Patterned", value: "patterned" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Bomber Jackets",
      //       value: "bomber-jackets",
      //       details: [],
      //     },
      //     {
      //       name_en: "Denim Jackets",
      //       value: "denim-jackets",
      //       details: [],
      //     },
      //     {
      //       name_en: "Leather Jackets",
      //       value: "leather-jackets",
      //       details: [],
      //     },
      //     {
      //       name_en: "Windbreakers",
      //       value: "windbreakers",
      //       details: [],
      //     },
      //     {
      //       name_en: "Shackets",
      //       value: "shackets",
      //       details: [],
      //     },
      //     {
      //       name_en: "Coats",
      //       value: "coats",
      //       details: [
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Logo", value: "logo" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Checked", value: "checked" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   name_en: "Blazers & Suits",
      //   value: "blazers-&-suits",
      //   groups: [
      //     {
      //       name_en: "Suits",
      //       value: "suits",
      //       details: [
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Checked", value: "checked" },
      //             { name_en: "Patterned", value: "patterned" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Skinny", value: "skinny" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Occasion",
      //           value: "occasion",
      //           options: [
      //             { name_en: "Casual", value: "casual" },
      //             { name_en: "Formal", value: "formal" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Blazers",
      //       value: "blazers",
      //       details: [
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Checked", value: "checked" },
      //             { name_en: "Patterned", value: "patterned" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Skinny", value: "skinny" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Occasion",
      //           value: "occasion",
      //           options: [
      //             { name_en: "Casual", value: "casual" },
      //             { name_en: "Formal", value: "formal" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Suit Pants",
      //       value: "suit-pants",
      //       details: [
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Checked", value: "checked" },
      //             { name_en: "Patterned", value: "patterned" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Skinny", value: "skinny" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Occasion",
      //           value: "occasion",
      //           options: [
      //             { name_en: "Casual", value: "casual" },
      //             { name_en: "Formal", value: "formal" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Suit Vests",
      //       value: "suit-vests",
      //       details: [],
      //     },
      //   ],
      // },
      // {
      //   name_en: "Cardigans & Sweaters",
      //   value: "cardigans-&-sweaters",
      //   groups: [
      //     {
      //       name_en: "Sweaters",
      //       value: "sweaters",
      //       details: [
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Color Block", value: "color-block" },
      //             { name_en: "Patterned", value: "patterned" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Cardigans",
      //       value: "cardigans",
      //       details: [],
      //     },
      //   ],
      // },
      // {
      //   name_en: "Shoes",
      //   value: "shoes",
      //   groups: [
      //     {
      //       name_en: "Flip Flops",
      //       value: "flip-flops",
      //       details: [],
      //     },
      //     {
      //       name_en: "Sneakers",
      //       value: "sneakers",
      //       details: [],
      //     },
      //     {
      //       name_en: "Sandals",
      //       value: "sandals",
      //       details: [],
      //     },
      //     {
      //       name_en: "Espadrilles",
      //       value: "espadrilles",
      //       details: [],
      //     },
      //     {
      //       name_en: "Boots",
      //       value: "boots",
      //       details: [
      //         {
      //           name_en: "Heel Height",
      //           value: "heel-height",
      //           options: [
      //             { name_en: "Low Heel", value: "low-heel" },
      //             { name_en: "No Heel", value: "no-heel" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Dress",
      //       value: "dress",
      //       details: [
      //         {
      //           name_en: "Heel Height",
      //           value: "heel-height",
      //           options: [
      //             { name_en: "Low Heel", value: "low-heel" },
      //             { name_en: "No Heel", value: "no-heel" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Loafers",
      //       value: "loafers",
      //       details: [
      //         {
      //           name_en: "Heel Height",
      //           value: "heel-height",
      //           options: [
      //             { name_en: "Low Heel", value: "low-heel" },
      //             { name_en: "No Heel", value: "no-heel" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   name_en: "Sportswear",
      //   value: "sportswear",
      //   groups: [
      //     {
      //       name_en: "Shirts",
      //       value: "shirts",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Color Block", value: "color-block" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Stripped", value: "striped" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Sleeve Length",
      //           value: "sleeve-length",
      //           options: [
      //             { name_en: "Long", value: "long" },
      //             { name_en: "Short", value: "short" },
      //             { name_en: "Sleeveless", value: "sleeveless" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Jackets",
      //       value: "jackets",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Color Block", value: "color-block" },
      //             { name_en: "patterned", value: "striped" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Style",
      //           value: "style",
      //           options: [
      //             { name_en: "Hooded", value: "hooded" },
      //             { name_en: "Parka", value: "parka" },
      //             { name_en: "Anorak", value: "anorak" },
      //             { name_en: "Other", value: "other" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Bottoms",
      //       value: "bottoms",
      //       details: [
      //         {
      //           name_en: "Fit",
      //           value: "fit",
      //           options: [
      //             { name_en: "Regular", value: "regular" },
      //             { name_en: "Relaxed", value: "relaxed" },
      //             { name_en: "Slim", value: "slim" },
      //           ],
      //           required: true,
      //         },
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Color Block", value: "color-block" },
      //             { name_en: "patterned", value: "striped" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   name_en: "Swimwear",
      //   value: "Swimwear",
      //   groups: [
      //     {
      //       name_en: "Board Shorts",
      //       value: "board-shorts",
      //       details: [],
      //     },
      //     {
      //       name_en: "Swim Trunks",
      //       value: "swim-trunks",
      //       details: [],
      //     },
      //   ],
      // },
      // {
      //   name_en: "Underwear",
      //   value: "underwear",
      //   groups: [
      //     {
      //       name_en: "Long",
      //       value: "long",
      //       details: [
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Dotted", value: "dotted" },
      //             { name_en: "Checked", value: "checked" },
      //             { name_en: "Stripped", value: "striped" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Floral", value: "floral" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Short",
      //       value: "short",
      //       details: [
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Dotted", value: "dotted" },
      //             { name_en: "Checked", value: "checked" },
      //             { name_en: "Stripped", value: "striped" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Floral", value: "floral" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   name_en: "Socks",
      //   value: "socks",
      //   groups: [
      //     {
      //       name_en: "Mini",
      //       value: "mini",
      //       details: [
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Dotted", value: "dotted" },
      //             { name_en: "Checked", value: "checked" },
      //             { name_en: "Stripped", value: "striped" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Ankle",
      //       value: "ankle",
      //       details: [
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Dotted", value: "dotted" },
      //             { name_en: "Checked", value: "checked" },
      //             { name_en: "Stripped", value: "striped" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //     {
      //       name_en: "Knee High",
      //       value: "knee-high",
      //       details: [
      //         {
      //           name_en: "Pattern",
      //           value: "pattern",
      //           options: [
      //             { name_en: "Solid Color", value: "solid-color" },
      //             { name_en: "Dotted", value: "dotted" },
      //             { name_en: "Checked", value: "checked" },
      //             { name_en: "Stripped", value: "striped" },
      //             { name_en: "Patterned", value: "patterned" },
      //             { name_en: "Logo", value: "logo" },
      //           ],
      //           required: true,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
];
