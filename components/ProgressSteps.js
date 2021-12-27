import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

class ProgressSteps extends Component {
	state = {
		stepCount: 0,
		activeStep: this.props.activeStep,
	};
	
	componentDidMount() {
		this.setState({ stepCount: React.Children.count(this.props.children) });
	}
	
	componentDidUpdate(prevProps) {
		if (prevProps.activeStep !== this.props.activeStep) {
			this.setActiveStep(this.props.activeStep);
		}
	}
	
	setActiveStep = (step) => {
		if (step >= this.state.stepCount - 1) {
			this.setState({ activeStep: this.state.stepCount - 1 });
		}
		
		if (step > -1 && step < this.state.stepCount - 1) {
			this.setState({ activeStep: step });
		}
	};
	
	render() {
		return (
			<View style={{ flex: 1 }}>
				{React.cloneElement(this.props.children[this.state.activeStep], {
					setActiveStep: this.setActiveStep,
					activeStep: this.state.activeStep,
					stepCount: this.state.stepCount,
				})}
			</View>
		);
	}
}

ProgressSteps.propTypes = {
	isComplete: PropTypes.bool,
	activeStep: PropTypes.number,
	topOffset: PropTypes.number,
	marginBottom: PropTypes.number,
};

ProgressSteps.defaultProps = {
	isComplete: false,
	activeStep: 0,
	topOffset: 30,
	marginBottom: 50,
};

export default ProgressSteps;
