import React from 'react';
import {PageGroup, PageSection, PageSectionVariants} from '@patternfly/react-core';
import {FilterPanel} from "./FilterPanel";
import {ExporterTable} from "./DeployerTable";


export const Deployer: React.FunctionComponent = () => {

    return (
        <React.Fragment>
            <PageGroup>
                <PageSection variant={PageSectionVariants.light}><FilterPanel/></PageSection>
            </PageGroup>
            <PageGroup><PageSection variant={PageSectionVariants.light}></PageSection></PageGroup>
            <PageGroup>
                <PageSection variant={PageSectionVariants.light}><ExporterTable/></PageSection>
            </PageGroup>
        </React.Fragment>
    );
};
