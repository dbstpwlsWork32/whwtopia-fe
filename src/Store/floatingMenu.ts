import { computed, shallowReactive } from 'vue'

export type IconFlag = 'new' | 'write'
type Display = {
  display: boolean;
  cb: () => void;
  role: 'button' | 'link';
  label: string;
  iconFlag: IconFlag;
}

const FLOATINGMENU = shallowReactive<Display>({
  display: false,
  /* eslint-disable @typescript-eslint/no-empty-function */
  cb: () => {},
  role: 'link',
  label: '',
  iconFlag: 'write'
})

const FLOATINGMENUTransform = computed(
  () => `translateY(${ -50 * ['write', 'new'].indexOf(FLOATINGMENU.iconFlag)}%)`
)


// display, iconFlag is maintained at App.vue
function updateFLOATINGMENU(newAttr: Omit<Omit<Display, 'display'>, 'iconFlag'>) {
  FLOATINGMENU.cb = newAttr.cb
  FLOATINGMENU.role = newAttr.role
  FLOATINGMENU.label = newAttr.label
}

export {
  FLOATINGMENU,
  FLOATINGMENUTransform,
  updateFLOATINGMENU,
}