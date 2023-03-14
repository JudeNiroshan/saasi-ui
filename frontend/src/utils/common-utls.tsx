import {IAction} from "@patternfly/react-table";
import {Label} from "@patternfly/react-core";
import {BellIcon, CheckCircleIcon, InfoCircleIcon} from "@patternfly/react-icons";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import React from "react";
import {Repository} from "../components/Exporter/ExporterTable";


export const getActionsByRowData = (repo: Repository): IAction[] => [
    {
        title: 'Run again',
        onClick: () => console.log(`clicked on Some action, on row ${repo.name}`)
    },
    {
        title: "Edit Configurations"
    },
    {
        title: 'View Details',
        onClick: () => console.log(`clicked on Third action, on row ${repo.name}`)
    },
    {
        isSeparator: true
    },
    {
        title: 'Run Deployer',
        onClick: () => console.log(`clicked on Some action, on row ${repo.name}`)
    }
];

export const getStatusByRowData = (repo: Repository): JSX.Element => {
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