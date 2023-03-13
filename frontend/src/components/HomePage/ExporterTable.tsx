import React from 'react';
import {
    Button, DropdownToggle, Bullseye,
    EmptyState,
    EmptyStateVariant,
    EmptyStateIcon, EmptyStateBody, Title
} from '@patternfly/react-core';
import {
    TableComposable,
    TableText,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    CustomActionsToggleProps,
    ActionsColumn,
    IAction
} from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';

interface Repository {
    name: string;
    branches: string;
    prs: string;
    workspaces: string;
    lastCommit: string;
    singleAction: string;
}

type ExampleType = 'defaultToggle' | 'customToggle';

export const ExporterTable: React.FunctionComponent = () => {
    // In real usage, this data would come from some external source like an API via props.
    const data: Repository[] = [
        { name: 'one', branches: 'two', prs: 'a', workspaces: 'four', lastCommit: 'five', singleAction: 'Start' },
        { name: 'a', branches: 'two', prs: 'k', workspaces: 'four', lastCommit: 'five', singleAction: '' },
        { name: 'p', branches: 'two', prs: 'b', workspaces: 'four', lastCommit: 'five', singleAction: 'Start' },
        { name: '4', branches: '2', prs: 'b', workspaces: 'four', lastCommit: 'five', singleAction: 'Start' },
        { name: '5', branches: '2', prs: 'b', workspaces: 'four', lastCommit: 'five', singleAction: 'Start' }
    ];

    const columnNames = {
        name: 'Applications',
        branches: 'Versions',
        prs: 'Tags',
        workspaces: 'Status',
        singleAction: 'Single action'
    };

    // This state is just for the ToggleGroup in this example and isn't necessary for TableComposable usage.
    const [exampleChoice, setExampleChoice] = React.useState<ExampleType>('customToggle');

    const customActionsToggle = (props: CustomActionsToggleProps) => (
        <DropdownToggle onToggle={props.onToggle} isDisabled={props.isDisabled}>
            Actions
        </DropdownToggle>
    );

    const defaultActions = (repo: Repository): IAction[] => [
        {
            title: 'Some action',
            onClick: () => console.log(`clicked on Some action, on row ${repo.name}`)
        },
        {
            title: <a href="https://www.patternfly.org">Link action</a>
        },
        {
            isSeparator: true
        },
        {
            title: 'Third action',
            onClick: () => console.log(`clicked on Third action, on row ${repo.name}`)
        }
    ];


    return (
        <React.Fragment>
            <TableComposable aria-label="Actions table">
                <Thead>
                    <Tr>
                        <Th>{columnNames.name}</Th>
                        <Th>{columnNames.branches}</Th>
                        <Th>{columnNames.prs}</Th>
                        <Th>{columnNames.workspaces}</Th>
                        <Td colSpan={2}>Actions</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.length == 0 &&
                        <Tr>
                            <Td colSpan={6}>
                                <Bullseye>
                                    <EmptyState variant={EmptyStateVariant.small}>
                                        <EmptyStateIcon icon={SearchIcon} />
                                        <Title headingLevel="h2" size="lg">
                                            No results found
                                        </Title>
                                        <EmptyStateBody>Clear all filters and try again.</EmptyStateBody>
                                        <Button variant="link">Clear all filters</Button>
                                    </EmptyState>
                                </Bullseye>
                            </Td>
                        </Tr>
                    }
                    {data.map(repo => {
                        // Arbitrary logic to determine which rows get which actions in this example
                        let rowActions: IAction[] | null = defaultActions(repo);

                        let singleActionButton = null;
                        if (repo.singleAction !== '') {
                            singleActionButton = (
                                <TableText>
                                    <Button variant="secondary">{repo.singleAction}</Button>
                                </TableText>
                            );
                        }

                        return (
                            <Tr key={repo.name}>
                                <Td dataLabel={columnNames.name}>{repo.name}</Td>
                                <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
                                <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
                                <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
                                <Td dataLabel={columnNames.singleAction} modifier="fitContent">
                                    {singleActionButton}
                                </Td>
                                <Td isActionCell>
                                    {rowActions ? (
                                        <ActionsColumn
                                            items={rowActions}
                                            isDisabled={repo.name === '4'} // Also arbitrary for the example
                                            actionsToggle={exampleChoice === 'customToggle' ? customActionsToggle : undefined}
                                        />
                                    ) : null}
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </TableComposable>
        </React.Fragment>
    );
};
