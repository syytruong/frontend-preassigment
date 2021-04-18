/**
 *
 * Asynchronously loads the component for LayoutProvider
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
