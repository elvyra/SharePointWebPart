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
import { ISaskaitosProps, BillsList, Bill } from "./components/ISaskaitosProps";

export interface ISaskaitosWebPartProps {
  description: string;
}

export default class SaskaitosWebPart extends BaseClientSideWebPart<
  ISaskaitosWebPartProps
> {
  public async render(): Promise<void> {
    const element: React.ReactElement<ISaskaitosProps> = React.createElement(
      Saskaitos,
      {
        description: this.properties.description,
        absoluteUrl: this.context.pageContext.web.absoluteUrl,
        list: await this._getListData(),
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
      .then((response: SPHttpClientResponse) => response.json())
      .then((json) => this._mapper(json.value))
      .catch((err) => {
        console.log("Error:", err);
        let arr: BillsList = { value: [] };
        return arr;
      });
  }

  private _mapper(list: any[]): BillsList {
    let mappedList: Bill[] = [];
    mappedList = list.map((item) => {
      return {
        Id: item.Id,
        Title: item.S_x0105_skaitosnumeris,
        Payed: item.Apmok_x0117_ta,
        Late: item.V_x0117_luojama_x0020_apmok_x0110 == 0 ? false : true,
        Amount: item.Bendrasuma,
        Responsible: item.Atsakingasasmuo,
        Date: item.Dokumentodata,
      };
    });
    return { value: mappedList };
  }
}
