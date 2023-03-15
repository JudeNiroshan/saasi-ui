import {
    ActionGroup,
    Button,
    Checkbox,
    Form, FormFieldGroupExpandable, FormFieldGroupHeader,
    FormGroup,
    PageGroup,
    PageSection,
    PageSectionVariants,
    Popover,
    Radio,
    TextInput
} from "@patternfly/react-core";
import React from "react";
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import {TrashIcon} from "@patternfly/react-icons";
import {useNavigate} from "react-router";
import './NewExporter.css';

interface ConfigMapProps {
    name: string;
    paramsKeys: []
}
interface NamespaceProps {
    name: string;
    description: string;
    configMaps: ConfigMapProps[];
}
export const NewExporter: React.FunctionComponent = () => {
    const [clusterId, setClusterId] = React.useState('');
    const [serverUrl, setServerUrl] = React.useState('');
    const [token, setToken] = React.useState('');
    const [exportName, setExportName] = React.useState('');
    const navigate = useNavigate()
    const [namespaces, setNamespaces] = React.useState<NamespaceProps[]>([]);
    const [newNamespaceName, setNewNamespaceName] = React.useState('');

    const removeNamespace = (namespace:NamespaceProps) => {
        const updatedNamespaces = namespaces.filter(ns => ns.name!== namespace.name);
        setNamespaces(updatedNamespaces);
    }
    const addNamespace = () => {
        const namespace = {
            name: newNamespaceName,
            description: '',
            configMaps: []
        }
        const updatedNamespaces = [...namespaces, namespace];
        setNamespaces(updatedNamespaces);
        setNewNamespaceName('')
    }
    return (
        <PageGroup>
            <PageSection variant={PageSectionVariants.light}>
                <Form isHorizontal>
                    <FormGroup
                        label="Exporter Name"
                        labelIcon={
                            <Popover
                                headerContent={
                                    <div>
                                        The{' '}
                                        <a href="https://schema.org/name" target="_blank" rel="noreferrer">
                                            name
                                        </a>{' '}
                                        of a{' '}
                                        <a href="https://schema.org/Person" target="_blank" rel="noreferrer">
                                            Person
                                        </a>
                                    </div>
                                }
                                bodyContent={
                                    <div>
                                        Often composed of{' '}
                                        <a href="https://schema.org/givenName" target="_blank" rel="noreferrer">
                                            givenName
                                        </a>{' '}
                                        and{' '}
                                        <a href="https://schema.org/familyName" target="_blank" rel="noreferrer">
                                            familyName
                                        </a>
                                        .
                                    </div>
                                }
                            >
                                <button
                                    type="button"
                                    aria-label="More info for name field"
                                    onClick={e => e.preventDefault()}
                                    aria-describedby="simple-form-name-01"
                                    className="pf-c-form__group-label-help"
                                >
                                    <HelpIcon noVerticalAlign/>
                                </button>
                            </Popover>
                        }
                        isRequired
                        fieldId="simple-form-name-02"
                    >
                        <TextInput
                            isRequired
                            type="text"
                            id="simple-form-name-02"
                            name="simple-form-name-02"
                            aria-describedby="simple-form-name-02-helper"
                            value={exportName}
                            onChange={setExportName}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Cluster ID"
                        labelIcon={
                            <Popover
                                headerContent={
                                    <div>
                                        Cluster ID
                                    </div>
                                }
                                bodyContent={
                                    <div>
                                        <p>
                                            It is visible in the Red Hat Openshift Console -&gt; Home -&gt; Overview
                                            -&gt; Details
                                        </p>
                                    </div>
                                }
                            >
                                <button
                                    type="button"
                                    aria-label="More info for name field"
                                    onClick={e => e.preventDefault()}
                                    aria-describedby="simple-form-name-01"
                                    className="pf-c-form__group-label-help"
                                >
                                    <HelpIcon noVerticalAlign/>
                                </button>
                            </Popover>
                        }
                        isRequired
                        fieldId="simple-form-name-01"
                        helperText="E.g. 262eaf03-67b5-4998-91ed-ad3d5f8c21be"
                    >
                        <TextInput
                            isRequired
                            type="text"
                            id="simple-form-name-01"
                            name="simple-form-name-01"
                            aria-describedby="simple-form-name-01-helper"
                            value={clusterId}
                            onChange={setClusterId}
                        />
                    </FormGroup>
                    <FormGroup
                        label="API Server URL"
                        isRequired
                        fieldId="simple-form-name-02"
                        helperText="E.g. https://api.cluster.example.opentlc.com:6443"
                    >
                        <TextInput
                            isRequired
                            type="text"
                            id="simple-form-name-02"
                            name="simple-form-name-02"
                            aria-describedby="simple-form-name-02-helper"
                            value={serverUrl}
                            onChange={setServerUrl}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Token"
                        isRequired
                        fieldId="simple-form-name-03"
                        helperText="Cluster API token"
                    >
                        <TextInput
                            isRequired
                            type="text"
                            id="simple-form-name-03"
                            name="simple-form-name-03"
                            aria-describedby="simple-form-name-03-helper"
                            value={token}
                            onChange={setToken}
                        />
                    </FormGroup>


                    <FormFieldGroupExpandable
                        isExpanded
                        toggleAriaLabel="Details"
                        header={
                            <FormFieldGroupHeader
                                titleText={{text: 'Namespaces', id: 'field-group1-titleText-id'}}
                                titleDescription="Namespaces that needs to be exported"
                                className="namespace-header"
                                actions={
                                    <>
                                        <TextInput
                                            type="text"
                                            className="namespace-header-input"
                                            value={newNamespaceName}
                                            onChange={setNewNamespaceName}
                                        />
                                        <Button variant="secondary" onClick={addNamespace}>Add
                                            Namespace</Button>

                                    </>
                                }
                            />
                        }
                    >
                        {namespaces.map((ns, index) => {
                            return (
                                <FormFieldGroupExpandable
                                    isExpanded
                                    toggleAriaLabel="Details"
                                    header={
                                        <FormFieldGroupHeader
                                            titleText={{
                                                text: ns.name,
                                                id: ns.name+index,
                                            }}
                                            titleDescription={ns.description}
                                            actions={
                                                <Button variant="plain" aria-label="Remove" onClick={() => removeNamespace(ns)}>
                                                    <TrashIcon/>
                                                </Button>
                                            }
                                        />
                                    }
                                >
                                    <FormGroup label="Label 1" isRequired fieldId="1-expanded-group1-label1">
                                        <TextInput
                                            isRequired
                                            id="1-expanded-group1-label1"
                                            name="1-expanded-group1-label1"
                                            value={'1-expanded-group1-label1'}
                                            // onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup label="Label 2" isRequired fieldId="1-expanded-group1-label2">
                                        <TextInput
                                            isRequired
                                            id="1-expanded-group1-label2"
                                            name="1-expanded-group1-label2"
                                            value={'1-expanded-group1-label2'}
                                            // onChange={handleChange}
                                        />
                                    </FormGroup>
                                </FormFieldGroupExpandable>
                            )
                        })

                        }

                    </FormFieldGroupExpandable>


                    <ActionGroup>
                        <Button variant="primary">Submit</Button>
                        <Button variant="link" onClick={() => navigate("/")}>Cancel</Button>
                    </ActionGroup>
                </Form>
            </PageSection>
        </PageGroup>

    );
};
