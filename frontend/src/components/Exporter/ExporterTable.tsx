import React from 'react';
import {
    Bullseye,
    Button,
    DropdownToggle,
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon,
    EmptyStateVariant, Text, TextContent, TextVariants,
    Title
} from '@patternfly/react-core';
import {
    ActionsColumn,
    CustomActionsToggleProps, ExpandableRowContent,
    IAction,
    TableComposable,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import {getActionsByRowData, getStatusByRowData} from "../../utils/common-utls";

export interface Repository {
    name: string;
    version: string;
    tag: string;
    createdAt: string;
    status: string;
    details: React.ReactNode;
}

export const ExporterTable: React.FunctionComponent = () => {
    // In real usage, this data would come from some external source like an API via props.
    const data: Repository[] = [
        {
            name: 'IBM',
            version: '2.0',
            tag: '',
            createdAt: new Date().toISOString(),
            status: 'Completed',
            details:
                <TextContent>
                    <Text component={TextVariants.p}>
                        Server URL<Text component={TextVariants.small}>https://api.cluster.example.opentlc.com:6443</Text>
                    </Text>
                    <Text component={TextVariants.p}>
                        Created By<Text component={TextVariants.small}>Jude Niroshan</Text>
                    </Text>
                </TextContent>
        },
        {
            name: 'Infinity',
            version: '1.1',
            tag: 'Hb33JL',
            createdAt: new Date().toISOString(),
            status: 'Running',
            details:
                <TextContent>
                    <Text component={TextVariants.p}>
                        Server URL<Text component={TextVariants.small}>https://api.cluster.example.opentlc.com:6443</Text>
                    </Text>
                    <Text component={TextVariants.p}>
                        Created By<Text component={TextVariants.small}>Jude Niroshan</Text>
                    </Text>
                </TextContent>
        },
        {
            name: 'ABB DCS',
            version: '1.0',
            tag: '',
            createdAt: new Date().toISOString(),
            status: 'Error',
            details:
                <TextContent>
                    <Text component={TextVariants.p}>
                        Server URL<Text component={TextVariants.small}>https://api.cluster.example.opentlc.com:6443</Text>
                    </Text>
                    <Text component={TextVariants.p}>
                        Created By<Text component={TextVariants.small}>Jude Niroshan</Text>
                    </Text>
                </TextContent>
        }
    ];
    const [expandedRepoNames, setExpandedRepoNames] = React.useState<string[]>([]);
    const setRepoExpanded = (repo: Repository, isExpanding = true) =>
        setExpandedRepoNames(prevExpanded => {
            const otherExpandedRepoNames = prevExpanded.filter(r => r !== repo.name);
            return isExpanding ? [...otherExpandedRepoNames, repo.name] : otherExpandedRepoNames;
        });
    const isRepoExpanded = (repo: Repository) => expandedRepoNames.includes(repo.name);
    const columnNames = {
        name: 'Exporter Name',
        createdAt: 'Created At',
        versions: 'Versions',
        tags: 'Tags',
        status: 'Status'
    };

    const customActionsToggle = (props: CustomActionsToggleProps) => (
        <DropdownToggle onToggle={props.onToggle} isDisabled={props.isDisabled}>
            Actions
        </DropdownToggle>
    );

    return (
        <React.Fragment>
            <TableComposable aria-label="Actions table">
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th>{columnNames.name}</Th>
                        <Th>{columnNames.createdAt}</Th>
                        <Th>{columnNames.versions}</Th>
                        <Th>{columnNames.tags}</Th>
                        <Th>{columnNames.status}</Th>
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
                                <Td dataLabel={columnNames.versions}>{repo.version}</Td>
                                <Td dataLabel={columnNames.tags}>{repo.tag}</Td>
                                <Td dataLabel={columnNames.status}>
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
