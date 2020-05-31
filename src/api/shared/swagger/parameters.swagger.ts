import {
  ParameterObject,
  ReferenceObject,
} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const visitorIdParameter: ParameterObject | ReferenceObject = {
  name: "hash",
  in: "path",
  required: true,
  description: "Visitor or admin ID of your tournament",
}

export const adminIdParameter: ParameterObject | ReferenceObject = {
  name: "hash",
  in: "path",
  required: true,
  description: "Admin ID of your tournament",
}
