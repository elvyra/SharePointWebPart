import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import * as strings from "SaskaitosWebPartStrings";
import Saskaitos from "./components/Saskaitos";
import { ISaskaitosProps, BillsList } from "./components/ISaskaitosProps";

export interface ISaskaitosWebPartProps {
  description: string;
}

export default class SaskaitosWebPart extends BaseClientSideWebPart<
  ISaskaitosWebPartProps
> {
  public async render(): Promise<void> {
    console.log(await this._getListData());
    const element: React.ReactElement<ISaskaitosProps> = React.createElement(
      Saskaitos,
      {
        description: this.properties.description,
        absoluteUrl: this.context.pageContext.web.absoluteUrl,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }

  private _getListData(): Promise<BillsList> {
    return this.context.spHttpClient
      .get(
        this.context.pageContext.web.absoluteUrl +
          `/_api/web/lists/GetByTitle('Sąskaitos')/Items`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }
}
