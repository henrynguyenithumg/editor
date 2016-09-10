import React from 'react';
import FileReaderInput from 'react-file-reader-input';

import { Button, Text } from 'rebass';
import { Menu, NavItem, Tooltip, Container, Block, Fixed } from 'rebass'

import MdFileDownload from 'react-icons/lib/md/file-download'
import MdFileUpload from 'react-icons/lib/md/file-upload'
import MdSettings from 'react-icons/lib/md/settings'
import MdLayers from 'react-icons/lib/md/layers'
import MdSave from 'react-icons/lib/md/save'

import theme from './theme.js';

export class Toolbar extends React.Component {
	static propTypes = {
    onStyleUpload: React.PropTypes.func.isRequired,
    onStyleDownload: React.PropTypes.func.isRequired,
    onStyleSave: React.PropTypes.func,
    onOpenSettings: React.PropTypes.func,
    onOpenLayers: React.PropTypes.func,
		// Whether a style is available for download or saving
		// A style with no layers should not be available
    styleAvailable: React.PropTypes.bool,
  }

	onUpload(_, files) {
		const [e, file] = files[0];
		const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = e => {
			const style = JSON.parse(e.target.result);
			this.props.onStyleUpload(style);
		}
    reader.onerror = e => console.log(e.target);
	}

	saveButton() {
		if(this.props.styleAvailable) {
			return <Block>
				<Button onClick={this.props.onStyleSave} big={true}>
					<Tooltip inverted rounded title="Save style">
						<MdSave />
					</Tooltip>
				</Button>
			</Block>
		}
		return null
	}

	downloadButton() {
		if(this.props.styleAvailable) {
			return <Block>
				<Button onClick={this.props.onStyleDownload} big={true}>
					<Tooltip inverted rounded title="Download style">
						<MdFileDownload />
					</Tooltip>
				</Button>
			</Block>
		}
		return null
	}

	render() {
		return <Container style={{
			zIndex: 100,
			position: "fixed",
			height: "100%",
			left: "0",
			top: "0",
			bottom: "0",
			backgroundColor: theme.colors.black }
		}>
			<Block>
				  <FileReaderInput onChange={this.onUpload.bind(this)}>
					<Button big={true} theme={this.props.styleAvailable ? "default" : "success"}>
						<Tooltip inverted rounded title="Upload style">
						  <MdFileUpload />
						</Tooltip>
					</Button>
					</FileReaderInput>
			</Block>
			{this.downloadButton()}
			{this.saveButton()}
			<Block>
				<Button big={true} onClick={this.props.onOpenLayers}>
					<Tooltip inverted rounded title="Layers">
						<MdLayers />
          </Tooltip>
				</Button>
			</Block>
			<Block>
				<Button big={true} onClick={this.props.onOpenSettings}>
					<Tooltip inverted rounded title="Settings">
						<MdSettings />
          </Tooltip>
				</Button>
			</Block>
		</Container>
	}
}