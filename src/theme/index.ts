import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const CustomTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{violet.50}',
      100: '{violet.100}',
      200: '{violet.200}',
      300: '{violet.300}',
      400: '{violet.400}',
      500: '{violet.500}',
      600: '{violet.600}',
      700: '{violet.700}',
      800: '{violet.800}',
      900: '{violet.900}',
      950: '{violet.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{stone.50}',
          100: '{stone.100}',
          200: '{stone.200}',
          300: '{stone.300}',
          400: '{stone.400}',
          500: '{stone.500}',
          600: '{stone.600}',
          700: '{stone.700}',
          800: '{stone.800}',
          900: '{stone.900}',
          950: '{stone.950}',
        },
      },
    },
  },
  components: {
    card: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.0}',
            color: '{surface.700}',
            shadow: '0 0px 10px 0 {surface.100}',
          },
          subtitle: {
            color: '{surface.500}',
          },
        },
      },
    },
    paginator: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.0}',
          },
          navButton: {
            color: '{primary.700}',
            hoverBackground: '{primary.50}',
            hoverColor: '{primary.700}',
            selectedBackground: '{primary.100}',
          },
        },
      },
    },
    select: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.0}',
            color: '{surface.700}',
            borderColor: '{surface.200}',
          },
          option: {
            color: '{surface.700}',
            selectedBackground: '{primary.700}',
            selectedColor: '{primary.0}',
          },
          dropdown: {
            color: '{surface.700}',
          },
          overlay: {
            background: '{surface.0}',
            borderColor: '{surface.200}',
          },
          clearIcon: {
            color: '{primary.700}',
          },
        },
      },
    },
    autocomplete: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.0}',
            color: '{surface.700}',
            borderColor: '{surface.200}',
          },
          option: {
            color: '{surface.700}',
            selectedBackground: '{primary.700}',
            selectedColor: '{primary.0}',
          },
          dropdown: {
            color: '{surface.700}',
            hoverBackground: '{surface.50}',
          },
          overlay: {
            background: '{surface.0}',
            borderColor: '{surface.200}',
          },
        },
      },
    },
    inputtext: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.0}',
            color: '{surface.700}',
            borderColor: '{surface.200}',
            hoverBorderColor: '{primary.500}',
          },
        },
      },
    },
  },
})
