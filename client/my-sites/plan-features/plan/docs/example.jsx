/**
 * External dependencies
 */
import React from 'react';
import PureRenderMixin from 'react-pure-render/mixin';

/**
 * Internal dependencies
 */
import PlanHeader from '../header';

export default React.createClass( {

	displayName: 'Plan',

	mixins: [ PureRenderMixin ],

	render() {
		const price = {
			currencySymbol: '$',
			dollars: '8',
			cents: '25'
		};
		return (
			<div className="design-assets__group">
				<h2>
					<a href="/devdocs/app-components/plan">Plan</a>
				</h2>
				<div>
					<PlanHeader
						popular
						current
						title={ 'Premium' }
						planType={ 'premium' }
						price={ price }
						billingTimeFrame={ 'per month, billed yearly' }
					/>
				</div>
			</div>
		);
	}
} );
