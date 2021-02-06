import { computed, shallowReactive, watch } from 'vue'

type Display = {
  display: boolean;
  cb: () => void;
  role: 'button' | 'link';
  label: string;
  iconFlag: 'new' | 'write';
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

function updateFLOATINGMENU(newAttr: Omit<Display, 'display'>) {
  FLOATINGMENU.cb = newAttr.cb
  FLOATINGMENU.role = newAttr.role
  FLOATINGMENU.label = newAttr.label
  FLOATINGMENU.iconFlag = newAttr.iconFlag
}

export {
  FLOATINGMENU,
  FLOATINGMENUTransform,
  updateFLOATINGMENU,
}