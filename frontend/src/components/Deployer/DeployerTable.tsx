import React from 'react';
import {
    Bullseye,
    Button,
    DropdownToggle,
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon,
    EmptyStateVariant, Label,
    Text,
    TextContent,
    TextVariants,
    Title
} from '@patternfly/react-core';
import {
    ActionsColumn,
    CustomActionsToggleProps,
    ExpandableRowContent, IAction,
    TableComposable,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import {BellIcon, CheckCircleIcon, InfoCircleIcon} from "@patternfly/react-icons";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";

interface Repository {
    name: string;
    createdAt: string;
    version: string;
    tag: string;
    status: string;
    details: React.ReactNode;
}

export const ExporterTable: React.FunctionComponent = () => {
    // In real usage, this data would come from some external source like an API via props.
    const data: Repository[] = [
        {
            name: 'Infinity',
            createdAt: new Date().toISOString(),
            version: '1.1', tag: 'Hb33JL',
            status: 'Running',
            details:
                <TextContent>
                    <Text component={TextVariants.p}>
                        Server URL<Text component={TextVariants.small}>http://www.redhat.com/en/office-locations/US-node2</Text>
                    </Text>
                    <Text component={TextVariants.p}>
                        Exporter Name<Text component={TextVariants.small}>Atlanta</Text>
                    </Text>
                    <Text component={TextVariants.p}>
                        Last Modified<Text component={TextVariants.small}>5 hours ago</Text>
                    </Text>
                </TextContent>
            },
        {name: 'ABB DCS', createdAt: new Date().toISOString(), version: '1.0', tag: '', status: 'Error', details: 'some details'},
        {name: 'ABB DCS', createdAt: new Date().toISOString(), version: '1.1', tag: '', status: 'Completed', details: 'some details'},
        {name: 'ABB DCS', createdAt: new Date().toISOString(), version: '1.2', tag: '', status: 'Completed', details: 'some details'}
    ];
    const [expandedRepoNames, setExpandedRepoNames] = React.useState<string[]>([]);
    const setRepoExpanded = (repo: Repository, isExpanding = true) =>
        setExpandedRepoNames(prevExpanded => {
            const otherExpandedRepoNames = prevExpanded.filter(r => r !== repo.name);
            return isExpanding ? [...otherExpandedRepoNames, repo.name] : otherExpandedRepoNames;
        });
    const isRepoExpanded = (repo: Repository) => expandedRepoNames.includes(repo.name);

    const columnNames = {
        name: 'Deployer Name',
        createdAt: 'Created At',
        branches: 'Versions',
        prs: 'Tags',
        workspaces: 'Status'
    };

    const customActionsToggle = (props: CustomActionsToggleProps) => (
        <DropdownToggle onToggle={props.onToggle} isDisabled={props.isDisabled}>
            Actions
        </DropdownToggle>
    );

    const getActionsByRowData = (repo: Repository): IAction[] => [
        {
            title: "Run again",
        },
        {
            title: "Edit Configurations"
        },
        {
            isSeparator: true
        },
        {
            title: 'View Details',
            onClick: () => console.log(`clicked on Third action, on row ${repo.name}`)
        }
    ];

    const getStatusByRowData = (repo: Repository): JSX.Element => {
        switch (repo.status) {
            case 'Completed':
                return (
                    <Label color="green" icon={<CheckCircleIcon/>}>
                        {repo.status}
                    </Label>);
            case 'Running':
                return (
                    <Label color="blue" icon={<InfoCircleIcon/>}>
                        {repo.status}
                    </Label>);
            case 'Error':
                return (
                    <Label color="red" icon={<ExclamationCircleIcon/>}>
                        {repo.status}
                    </Label>);
            default:
                return (
                    <Label color="green" icon={<BellIcon/>}>
                        Unknown
                    </Label>);
        }
    }

    return (
        <React.Fragment>
            <TableComposable aria-label="Actions table">
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th>{columnNames.name}</Th>
                        <Th>{columnNames.createdAt}</Th>
                        <Th>{columnNames.branches}</Th>
                        <Th>{columnNames.prs}</Th>
                        <Th>{columnNames.workspaces}</Th>
                        <Td>Actions</Td>
                    </Tr>
                </Thead>
                {data.length == 0 &&
                    <Tbody>
                    <Tr>
                        <Td colSpan={6}>
                            <Bullseye>
                                <EmptyState variant={EmptyStateVariant.small}>
                                    <EmptyStateIcon icon={SearchIcon}/>
                                    <Title headingLevel="h2" size="lg">
                                        No results found
                                    </Title>
                                    <EmptyStateBody>Clear all filters and try again.</EmptyStateBody>
                                    <Button variant="link">Clear all filters</Button>
                                </EmptyState>
                            </Bullseye>
                        </Td>
                    </Tr>
                    </Tbody>
                }
                {data.map((repo, rowIndex) => {

                    // Arbitrary logic to determine which rows get which actions in this example
                    let rowActions = getActionsByRowData(repo);

                    return (
                        <Tbody key={repo.name} isExpanded={isRepoExpanded(repo)}>
                        <Tr key={repo.name}>
                            <Td
                                expand={
                                    repo.details
                                        ? {
                                            rowIndex,
                                            isExpanded: isRepoExpanded(repo),
                                            onToggle: () => setRepoExpanded(repo, !isRepoExpanded(repo)),
                                            expandId: 'composable-expandable-example'
                                        }
                                        : undefined
                                }
                            />
                            <Td dataLabel={columnNames.name}>{repo.name}</Td>
                            <Td dataLabel={columnNames.createdAt}>{repo.createdAt}</Td>
                            <Td dataLabel={columnNames.branches}>{repo.version}</Td>
                            <Td dataLabel={columnNames.prs}>{repo.tag}</Td>
                            <Td dataLabel={columnNames.workspaces}>
                                {getStatusByRowData(repo)}
                            </Td>
                            <Td isActionCell>
                                {rowActions ? (
                                    <ActionsColumn
                                        items={rowActions}
                                        isDisabled={repo.name === '4'} // Also arbitrary for the example
                                        actionsToggle={customActionsToggle}
                                    />
                                ) : null}
                            </Td>
                        </Tr>
                            {repo.details ? (
                                <Tr isExpanded={isRepoExpanded(repo)}>
                                    <Td />
                                    {repo.details ? (
                                        <Td dataLabel="Repo detail 1" colSpan={3}>
                                            <ExpandableRowContent>{repo.details}</ExpandableRowContent>
                                        </Td>
                                    ) : null}
                                </Tr>
                            ) : null}
                        </Tbody>
                    );
                })}
            </TableComposable>
        </React.Fragment>
    );
};
