import React from 'react';
import {Form, FormGroup, FormSelect, FormSelectOption, Grid, GridItem, TextInput} from '@patternfly/react-core';

export const FilterPanel: React.FunctionComponent = () => {
    const [app, setApp] = React.useState('please choose');
    const [version, setVersion] = React.useState('please choose');
    const [tag, setTag] = React.useState('');

    const handleAppOptionChange = (appOption: string) => {
        setApp(appOption)
    };
    const handleVersionOptionChange = (versionOption: string) => {
        setVersion(versionOption)
    };
    const handleTagChange = (tag: string) => {
        setTag(tag)
    };
    const appOptions = [
        {value: 'select one', label: 'Select one', disabled: false},
        {value: 'infinity', label: 'Infinity', disabled: false},
        {value: 'abb', label: 'ABB DCS', disabled: false},
        {value: 'finastra', label: 'Finastra', disabled: false},
        {value: 'ibm', label: 'IBM', disabled: false},
    ];
    const versionOptions = [
        {value: 'select one', label: 'Select one', disabled: false},
        {value: '1.0', label: '1.0', disabled: false},
        {value: '1.1', label: '1.1', disabled: false},
        {value: '2.0', label: '2.0', disabled: false},
    ];
    return (
        <div className="filter-panel">
            <Form isHorizontal>
                <Grid hasGutter md={6}>
                    <GridItem span={4}>
                        <FormGroup
                            label="Application"
                            isRequired
                            fieldId="horizontal-form-name"
                            helperText="Select an application"
                            style={{marginRight: "10em"}}
                        >
                            <FormSelect
                                value={app}
                                onChange={handleAppOptionChange}
                                id="horizontal-form-title"
                                name="horizontal-form-title"
                                aria-label="Your title"
                            >
                                {appOptions.map((option, index) => (
                                    <FormSelectOption isDisabled={option.disabled} key={index} value={option.value}
                                                      label={option.label}/>
                                ))}
                            </FormSelect>
                        </FormGroup>
                    </GridItem>
                    <GridItem span={3}>
                        <FormGroup
                            label="Version"
                            fieldId="horizontal-form-name"
                            helperText="Select a version"
                        >
                            <FormSelect
                                value={version}
                                onChange={handleVersionOptionChange}
                                id="horizontal-form-title"
                                name="horizontal-form-title"
                                aria-label="Your title"
                            >
                                {versionOptions.map((option, index) => (
                                    <FormSelectOption isDisabled={option.disabled} key={index} value={option.value}
                                                      label={option.label}/>
                                ))}
                            </FormSelect>
                        </FormGroup>
                    </GridItem>
                    <GridItem span={4}>
                        <FormGroup
                            label="Tag"
                            fieldId="horizontal-form-name"
                            helperText="Mention a specific tag"
                            style={{marginLeft: "10em"}}
                        >
                            <TextInput
                                value={tag}
                                isRequired
                                type="text"
                                id="horizontal-form-name"
                                aria-describedby="horizontal-form-name-helper"
                                name="horizontal-form-name"
                                onChange={handleTagChange}
                            />
                        </FormGroup>
                    </GridItem>
                </Grid>
            </Form>
        </div>
    )
}