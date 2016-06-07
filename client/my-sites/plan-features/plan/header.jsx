/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Internal Dependencies
 **/
import localize from 'lib/mixins/i18n/localize';
import Gridicon from 'components/gridicon';

class PlanHeader extends Component {

	render() {
		const { billingTimeFrame, current, planType, popular, price, title, translate } = this.props;
		const figureClasses = classNames( 'plan-features-header__figure', `is-${ planType }` );
		return (
			<header className="plan-features-header">
				{
					popular &&
						<div className="plan-features-header__banner">
							{ translate( 'Our most popular plan' ) }
						</div>
				}
				<div className={ figureClasses }>
					{ current && <Gridicon icon="checkmark-circle" className="plan-features-header__checkmark" /> }
				</div>
				<div className="plan-features-header__text">
					<h4 className="plan-features-header__title">{ title }</h4>
					<h4 className="plan-features-header__price">
						<sup className="plan-features-header__currency-symbol">
							{ price.currencySymbol }
						</sup>
						<span className="plan-features-header__dollars">
							{ price.dollars }
						</span>
						<sup className="plan-features-header__cents">
							{ `.${ price.cents }` }
						</sup>
					</h4>
					<p className="plan-features-header__timeframe">
						{ billingTimeFrame }
					</p>
				</div>
			</header>
		);
	}

}

PlanHeader.propTypes = {
	title: PropTypes.string,
	planType: React.PropTypes.oneOf( [ 'free', 'premium', 'business' ] ),
	price: PropTypes.object,
	billingTimeFrame: PropTypes.string,
	current: PropTypes.bool,
	popular: PropTypes.bool
};

PlanHeader.defaultProps = {
	current: false,
	popular: false
};

export default localize( PlanHeader );
