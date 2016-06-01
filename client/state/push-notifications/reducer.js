/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import debugFactory from 'debug';
import moment from 'moment';
import pick from 'lodash/pick';

/**
 * Internal dependencies
 */
import {
	DESERIALIZE,
	PUSH_NOTIFICATIONS_API_READY,
	PUSH_NOTIFICATIONS_AUTHORIZE,
	PUSH_NOTIFICATIONS_BLOCK,
	PUSH_NOTIFICATIONS_DISMISS_NOTICE,
	PUSH_NOTIFICATIONS_MUST_PROMPT,
	PUSH_NOTIFICATIONS_RECEIVE_SUBSCRIPTION,
	PUSH_NOTIFICATIONS_RECEIVE_REGISTER_DEVICE,
	PUSH_NOTIFICATIONS_RECEIVE_UNREGISTER_DEVICE,
	PUSH_NOTIFICATIONS_SUBSCRIBE,
	PUSH_NOTIFICATIONS_TOGGLE_ENABLED,
	PUSH_NOTIFICATIONS_TOGGLE_UNBLOCK_INSTRUCTIONS,
	PUSH_NOTIFICATIONS_UNSUBSCRIBE,
} from 'state/action-types';
const debug = debugFactory( 'calypso:push-notifications' );

function settings( state = {}, action ) {
	switch ( action.type ) {
		case DESERIALIZE: {
			// Don't persist these
			return Object.assign( {}, state, {
				// API status & permissions should be checked on boot
				apiReady: false,
				authorized: false,
				blocked: false,

				// The dialog should default to hidden @TODO move to ui subtree?
				showingUnblockInstructions: false,

				// @TODO enforce TTL on dismissedNotice
			} );
		}
		case PUSH_NOTIFICATIONS_API_READY: {
			debug( 'API is ready' );
			return Object.assign( {}, state, {
				apiReady: true
			} );
		}

		case PUSH_NOTIFICATIONS_AUTHORIZE: {
			return Object.assign( {}, state, {
				authorized: true,
				blocked: false
			} );
		}

		case PUSH_NOTIFICATIONS_BLOCK: {
			return Object.assign( {}, state, {
				authorized: false,
				blocked: true
			} );
		}

		case PUSH_NOTIFICATIONS_MUST_PROMPT: {
			return Object.assign( {}, state, {
				authorized: false,
				blocked: false
			} );
		}

		case PUSH_NOTIFICATIONS_TOGGLE_ENABLED: {
			return Object.assign( {}, state, {
				enabled: ! state.enabled
			} );
		}

		case PUSH_NOTIFICATIONS_DISMISS_NOTICE: {
			return Object.assign( {}, state, {
				dismissedNotice: true,
				dismissedNoticeAt: ( new Date() ).getTime(),
			} );
		}

		case PUSH_NOTIFICATIONS_SUBSCRIBE: {
			const {
				subscription,
				deviceId
			} = action;

			if ( ! ( subscription && deviceId ) ) {
				return state;
			}
			return Object.assign( {}, state, {
				subscription: {
					deviceId,
					subscription,
					lastModified: moment().format()
				}
			} );
		}

		case PUSH_NOTIFICATIONS_TOGGLE_UNBLOCK_INSTRUCTIONS: {
			return Object.assign( {}, state, {
				showingUnblockInstructions: !state.showingUnblockInstructions
			} );
		}

		case PUSH_NOTIFICATIONS_UNSUBSCRIBE: {
			return Object.assign( {}, state, {
				subscription: null
			} );
		}

		case PUSH_NOTIFICATIONS_RECEIVE_UNREGISTER_DEVICE: {
			const { data } = action;
			if ( ! data.success ) {
				debug( 'Couldn\'t unregister device', data );
			}
			debug( 'Deleted subscription', data );
			return Object.assign( {}, state, {
				lastUpdated: null,
				wpcomSubscription: null
			} );
		}

		case PUSH_NOTIFICATIONS_RECEIVE_REGISTER_DEVICE: {
			const { data } = action;
			debug( 'Received WPCOM device registration results', data );
			const wpcomSubscription = pick( data, [ 'ID', 'settings' ] );
			let lastUpdated;

			if ( data && data._headers && data._headers.Date ) {
				lastUpdated = new Date( lastUpdated );
				if ( lastUpdated.getTime() ) {
					// Calling moment with non-ISO date strings is deprecated
					// see: https://github.com/moment/moment/issues/1407
					lastUpdated = moment( lastUpdated.toISOString() ).format();
				} else {
					lastUpdated = moment().format();
				}
			} else {
				lastUpdated = moment().format();
			}

			return Object.assign( {}, state, {
				lastUpdated,
				wpcomSubscription
			} );
		}

		case PUSH_NOTIFICATIONS_RECEIVE_SUBSCRIPTION: {
			const subscription = action.subscription;
			debug( 'receive subscription', subscription );

			return Object.assign( {}, state, {
				subscription,
			} );
		}

		default:
			return state;
	}
}

export default combineReducers( {
	settings
} );
