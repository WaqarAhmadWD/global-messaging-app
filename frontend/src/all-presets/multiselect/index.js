export default {
  root: ({ props, state }) => ({
    class: [
      // Font
      "leading-none",

      // Display and Position
      "inline-flex",
      "relative",

      // Shape
      "rounded-md",

      // Color and Background
      { "bg-surface-0 ": !props.disabled },
      "border",
      { "border-surface-300": !props.invalid },

      // Invalid State
      "invalid:focus:ring-red-200",
      "invalid:hover:border-red-500",
      { "border-red-500 ": props.invalid },

      // Transitions
      "transition-all",
      "duration-200",

      // States
      { "hover:border-surface-400 ": !props.invalid },
      {
        "outline-none outline-offset-0 z-10 ring-1 ring-primary-500 ":
          state.focused,
      },

      // Misc
      "cursor-pointer",
      "select-none",
      {
        "bg-surface-200 select-none pointer-events-none cursor-default":
          props.disabled,
      },
    ],
  }),
  labelContainer: "overflow-hidden flex flex-auto cursor-pointer",
  label: ({ props }) => ({
    class: [
      "text-base leading-2",

      // Spacing
      {
        "py-2 px-3":
          props.display === "comma" ||
          (props.display === "chip" && !props?.modelValue?.length),
        "py-1 px-1": props.display === "chip" && props?.modelValue?.length > 0,
      },

      // Color
      {
        "text-surface-800 ": props.modelValue?.length,
        "text-surface-400 ": !props.modelValue?.length,
      },
      "placeholder:text-surface-400 ",

      // Transitions
      "transition duration-200",

      // Misc
      "overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis",
    ],
  }),
  dropdown: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",

      // Color and Background
      "bg-transparent",
      "text-surface-500",

      // Size
      "w-12",

      // Shape
      "rounded-r-md",
    ],
  },
  overlay: {
    class: [
      // Colors
      "bg-surface-0 ",
      "text-surface-700 ",

      // Shape
      "border border-surface-300 ",
      "rounded-md",
      "shadow-md",
      "mt-[2px]",
    ],
  },
  header: {
    class: [
      //Flex
      "flex items-center justify-between",

      // Spacing
      "pt-2 px-4 pb-0 gap-2",
      "m-0",

      //Shape
      "border-b-0",
      "rounded-tl-md",
      "rounded-tr-md",

      // Color
      "text-surface-700 ",
      "bg-surface-0 ",
      "border-surface-300 ",

      "[&_[data-pc-name=pcfiltercontainer]]:!flex-auto",
      "[&_[data-pc-name=pcfilter]]:w-full",
    ],
  },
  listContainer: {
    class: [
      // Sizing
      "max-h-[200px]",

      // Misc
      "overflow-auto",
    ],
  },
  list: {
    class: "p-1 list-none m-0",
  },
  option: ({ context }) => ({
    class: [
      "relative",
      "flex items-center",

      // Font
      "leading-none",

      // Spacing
      "m-0 px-3 py-2 gap-2",
      "first:mt-0 mt-[2px]",

      // Shape
      "border-0 rounded",

      // Colors
      {
        "text-surface-700 ": !context.focused && !context.selected,
        "bg-surface-200 ": context.focused && !context.selected,
        "text-surface-700 ": context.focused && !context.selected,
        "bg-highlight": context.selected,
      },

      //States
      { "hover:bg-surface-100 ": !context.focused && !context.selected },
      { "hover:bg-highlight-emphasis": context.selected },
      {
        "hover:text-surface-700 hover:bg-surface-100 ":
          context.focused && !context.selected,
      },

      // Transition
      "transition-shadow duration-200",

      // Misc
      "cursor-pointer overflow-hidden whitespace-nowrap",
    ],
  }),
  optionGroup: {
    class: [
      "font-semibold",

      // Spacing
      "m-0 py-2 px-3",

      // Colors
      "text-surface-400 ",

      // Misc
      "cursor-auto",
    ],
  },
  emptyMessage: {
    class: [
      // Font
      "leading-none",

      // Spacing
      "py-2 px-3",

      // Color
      "text-surface-800 ",
      "bg-transparent",
    ],
  },
  loadingIcon: {
    class: "text-surface-400  animate-spin",
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass:
      "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0",
  },
};
