/**
 * Vue plugin that adds the directive v-scroll-sync.
 *
 *     <div v-scroll-sync>
 *
 * v-scroll-sync optionally lets you specify a group the elements to scroll
 * together. All ungrouped elements are grouped together.
 *
 *     <div v-scroll-sync:group1>
 *
 * It also supports two modifiers, .x and .y, if you want to only sync
 * scrolling on one of those two axis. It defaults to both.
 *
 *     <div v-scroll-sync:group1.x>
 */
const VScrollSync = {
    install(Vue, options) {
        const groups = {};
        let isScrolling = false;

        let elements = (group, modifiers, e) => {
            if (e) {
                if (!(group in groups)) {
                    groups[group] = [];
                }
                groups[group].push({ modifiers, e });
            }
            return groups[group];
        };

        const scrollSync = {

            bind(el, {
                arg: group,
                modifiers,
                value: applyScroll = (element, target, { x, y }) => {
                    if (y) {
                        target.scrollTop = element.scrollTop
                            * (target.scrollHeight - target.clientHeight)
                            / (element.scrollHeight - element.clientHeight);
                    }
                    if (x) {
                        target.scrollLeft = element.scrollLeft
                            * (target.scrollWidth - target.clientWidth)
                            / (element.scrollWidth - element.clientWidth);
                    }
                },
            }) {
                if (!('x' in modifiers || 'y' in modifiers)) {
                    modifiers.x = true;
                    modifiers.y = true;
                }

                elements(group, modifiers, el);

                el.addEventListener('scroll', () => {
                    if (!isScrolling) {
                        isScrolling = true;
                        requestAnimationFrame(() => {
                            elements(group)
                                .filter(({ e }) => e !== el)
                                .forEach(({ modifiers, e }) => {
                                    applyScroll(el, e, modifiers);
                                });
                            requestAnimationFrame(() => {
                                isScrolling = false;
                            });
                        });
                    }
                });
            },
        };

        Vue.directive('scroll-sync', scrollSync);
    },
};

export default VScrollSync;
