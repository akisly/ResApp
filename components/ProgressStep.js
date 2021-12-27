import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
import COLORS from "../constants/colors";

class ProgressStep extends Component {
	onNextStep = async () => {
		this.props.onNext && (await this.props.onNext());
		
		// Return out of method before moving to next step if errors exist.
		if (this.props.errors) {
			return;
		}
		
		this.props.setActiveStep(this.props.activeStep + 1);
	};
	
	onPreviousStep = () => {
		// Changes active index and calls previous function passed by parent
		this.props.onPrevious && this.props.onPrevious();
		this.props.setActiveStep(this.props.activeStep - 1);
	};
	
	onSubmit = () => {
		this.props.onSubmit && this.props.onSubmit();
	};
	
	renderNextButton = () => {
		const btnStyle = {
			height: 55,
			flex: 1,
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: COLORS.primary,
			// marginHorizontal: 20,
			borderRadius: 10,
		};
		
		const btnTextStyle = {
			color: '#007AFF',
			fontSize: 18,
			...this.props.nextBtnTextStyle
		};
		
		const disabledBtnText = {
			color: '#cdcdcd'
		};
		
		// let textStyle = [btnTextStyle];
		// if (this.props.nextBtnDisabled) textStyle.push(disabledBtnText);
		
		return (
			<TouchableOpacity
				style={btnStyle}
				onPress={this.props.activeStep === this.props.stepCount - 1 ? this.onSubmit : this.onNextStep}
				disabled={this.props.nextBtnDisabled}
			>
				<Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
					{this.props.activeStep === this.props.stepCount - 1 ? this.props.finishBtnText : this.props.nextBtnText}
				</Text>
			</TouchableOpacity>
		);
	};
	
	render() {
		const scrollViewProps = this.props.scrollViewProps || {};
		const viewProps = this.props.viewProps || {};
		const isScrollable = this.props.scrollable;
		// const buttonRow = this.props.removeBtnRow ? null : (
		// 	<ProgressButtons
		// 		renderNextButton={this.renderNextButton}
		// 		renderPreviousButton={this.renderPreviousButton}
		// 	/>
		// );
		
		return (
			<View style={{ flex: 1 }}>
				{isScrollable
				 ? <ScrollView {...scrollViewProps}>{this.props.children}</ScrollView>
				 : <View {...viewProps}>{this.props.children}</View>}
				<View style={{ flex: 1, flexDirection: 'row', position: 'absolute', bottom: 15 }}>
					{this.props.activeStep !== 0 && (
						<View style={{ flex: 1, paddingHorizontal: 10 }}>
							<Button title="prev" onPress={this.onPreviousStep} color={COLORS.primary} />
						</View>
						// <TouchableOpacity
						// 	style={{
						// 		height: 55,
						// 		flex: 1,
						// 		width: '100%',
						// 		justifyContent: 'center',
						// 		alignItems: 'center',
						// 		backgroundColor: COLORS.primary,
						// 		borderRadius: 10,
						// 	}}
						// 	onPress={this.onPreviousStep}
						// 	disabled={this.props.previousBtnDisabled}
						// >
						// 	<Text>{this.props.activeStep === 0 ? '' : this.props.previousBtnText}</Text>
						// </TouchableOpacity>
					)}
					<View style={{ flex: 1, paddingHorizontal: 10 }}>
						<Button
							title={this.props.activeStep === this.props.stepCount - 1 ? this.props.finishBtnText : this.props.nextBtnText}
							onPress={this.props.activeStep === this.props.stepCount - 1 ? this.onSubmit : this.onNextStep}
							color={COLORS.primary}
						/>
					</View>
					{/*<TouchableOpacity*/}
					{/*	style={{*/}
					{/*		height: 55,*/}
					{/*		flex: 1,*/}
					{/*		width: '100%',*/}
					{/*		justifyContent: 'center',*/}
					{/*		alignItems: 'center',*/}
					{/*		backgroundColor: COLORS.primary,*/}
					{/*		borderRadius: 10,*/}
					{/*	}}*/}
					{/*	onPress={this.props.activeStep === this.props.stepCount - 1 ? this.onSubmit : this.onNextStep}*/}
					{/*	disabled={this.props.nextBtnDisabled}*/}
					{/*>*/}
					{/*	<Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>*/}
					{/*		{this.props.activeStep === this.props.stepCount - 1 ? this.props.finishBtnText : this.props.nextBtnText}*/}
					{/*	</Text>*/}
					{/*</TouchableOpacity>*/}
				</View>
			</View>
		);
	}
}

ProgressStep.propTypes = {
	label: PropTypes.string,
	onNext: PropTypes.func,
	onPrevious: PropTypes.func,
	onSubmit: PropTypes.func,
	setActiveStep: PropTypes.func,
	nextBtnText: PropTypes.string,
	previousBtnText: PropTypes.string,
	finishBtnText: PropTypes.string,
	stepCount: PropTypes.number,
	nextBtnStyle: PropTypes.object,
	nextBtnTextStyle: PropTypes.object,
	nextBtnDisabled: PropTypes.bool,
	previousBtnStyle: PropTypes.object,
	previousBtnTextStyle: PropTypes.object,
	previousBtnDisabled: PropTypes.bool,
	scrollViewProps: PropTypes.object,
	viewProps: PropTypes.object,
	errors: PropTypes.bool,
	removeBtnRow: PropTypes.bool,
	scrollable: PropTypes.bool
};

ProgressStep.defaultProps = {
	nextBtnText: 'Next',
	previousBtnText: 'Previous',
	finishBtnText: 'Submit',
	nextBtnDisabled: false,
	previousBtnDisabled: false,
	errors: false,
	removeBtnRow: false,
	scrollable: true
};

export default ProgressStep;
