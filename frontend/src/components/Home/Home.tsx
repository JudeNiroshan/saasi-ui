import React from 'react';
import {PageGroup, PageSection, PageSectionVariants, Skeleton} from '@patternfly/react-core';


export const Home: React.FunctionComponent = () => {

    return (
        <React.Fragment>
            <PageGroup>
                <PageSection variant={PageSectionVariants.light}>
                    Some Intro about SaaSi
                    <div style={{ height: '200px' }}>
                        <Skeleton height="100%" screenreaderText="Loading large rectangle contents" />
                    </div>
                </PageSection>
            </PageGroup>
            <PageGroup><PageSection variant={PageSectionVariants.light}></PageSection></PageGroup>
            <PageGroup>
                <PageSection variant={PageSectionVariants.light}>
                    <div style={{ height: '400px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <Skeleton height="25%" width="15%" screenreaderText="Loading contents" />
                        <Skeleton height="33%" width="15%" />
                        <Skeleton height="50%" width="15%" />
                        <Skeleton height="66%" width="15%" />
                        <Skeleton height="75%" width="15%" />
                        <Skeleton height="100%" width="15%" />
                    </div>
                </PageSection>
            </PageGroup>
        </React.Fragment>
    );
};
