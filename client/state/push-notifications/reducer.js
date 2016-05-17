/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	PUSH_NOTIFICATIONS_AUTHORIZE,
	PUSH_NOTIFICATIONS_DENY,
	PUSH_NOTIFICATIONS_READY,
	PUSH_NOTIFICATIONS_REGISTER,
	PUSH_NOTIFICATIONS_UNREGISTER,
	PUSH_NOTIFICATIONS_UPDATE_SUBSCRIPTIONS
} from 'state/action-types';

function settings( state = {}, action ) {
	switch ( action.type ) {
		case PUSH_NOTIFICATIONS_READY: {
			return Object.assign( {}, state, {
				ready: true
			} );
		}

		case PUSH_NOTIFICATIONS_AUTHORIZE: {
			return Object.assign( {}, state, {
				authorized: true,
				denied: false
			} );
		}

		case PUSH_NOTIFICATIONS_DENY: {
			return Object.assign( {}, state, {
				authorized: false,
				denied: true
			} );
		}

		case PUSH_NOTIFICATIONS_REGISTER: {
			return Object.assign( {}, state, {
				registered: true
			} );
		}

		case PUSH_NOTIFICATIONS_UNREGISTER: {
			return Object.assign( {}, state, {
				registered: false
			} );
		}

		case PUSH_NOTIFICATIONS_UPDATE_SUBSCRIPTIONS: {
			const newSubscriptions = action.subscriptions || {};
			return Object.assign( {}, state, {
				subscriptions: Object.assign( {}, state.subscriptions, newSubscriptions )
			} );
		}
	}

	return state;
}

export default combineReducers( {
	settings
} );
