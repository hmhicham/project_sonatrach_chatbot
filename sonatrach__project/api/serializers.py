


# ---------------------------------------
from rest_framework import serializers
from django.contrib.gis.geos import Polygon, Point, LineString
import base64
from accounts.models import Demande, Concession, Contract, Phase, Seismic, Well, GgStudies, Fracturation, Commitement, Bloc, Departement, SeisMonthlyPrevisions,DrillMonthlyPrevisions, TransactionLog, WellReservoirFluid, ReserveEstimation
import datetime
from dateutil.relativedelta import relativedelta
# from django.utils import timezone
from datetime import date
import logging

logger = logging.getLogger(__name__)

    #for the map
   # backend/yourapp/serializers.py
class BlocSerializer(serializers.ModelSerializer):
    positions = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField(),
            min_length=2,
            max_length=2
        ),
        min_length=3,
        write_only=True,
        required=False
    )
    positions_display = serializers.SerializerMethodField()

    class Meta:
        model = Bloc
        fields = ['id', 'positions', 'positions_display', 'coords']
        read_only_fields = ['positions_display', 'coords']

    def create(self, validated_data):
        print('Validated data in create:', validated_data)
        positions = validated_data.pop('positions', None)
        print('Positions in create:', positions)
        if positions:
            try:
                coords = [[pos[1], pos[0]] for pos in positions]
                if len(coords) < 3:
                    raise serializers.ValidationError("A polygon must have at least 3 points.")
                if coords[0] != coords[-1]:
                    coords.append(coords[0])
                validated_data['coords'] = Polygon(coords, srid=4326)
            except Exception as e:
                print('Error creating Polygon:', str(e))
                raise serializers.ValidationError(f"Invalid coordinates: {str(e)}")
        instance = super().create(validated_data)
        instance.refresh_from_db()
        print('Instance coords after save:', instance.coords)
        return instance

# there is no impact on the map
    # def get_positions(self, obj):
    #     if obj.coords:
    #         print(f"Coords for Bloc {obj.id}:", obj.coords)
    #         coords = obj.coords.coords
    #         print(f"Extracted coords for Bloc {obj.id}:", coords)
    #         return [list(coord)[::-1] for coord in coords[0]]  # Convert [lng, lat] back to [lat, lng]
    #     print(f"No coords for Bloc {obj.id}")
    #     return []

    def update(self, instance, validated_data):
        positions = validated_data.pop('positions', None)
        if positions:
            try:
                coords = [[pos[1], pos[0]] for pos in positions]
                if len(coords) < 3:
                    raise serializers.ValidationError("A polygon must have at least 3 points.")
                if coords[0] != coords[-1]:
                    coords.append(coords[0])
                validated_data['coords'] = Polygon(coords, srid=4326)
            except Exception as e:
                print('Error creating Polygon:', str(e))
                raise serializers.ValidationError(f"Invalid coordinates: {str(e)}")
        return super().update(instance, validated_data)

    def get_positions_display(self, obj):
        if obj.coords:
            print(f"Coords for Bloc {obj.id}:", obj.coords)
            try:
                coords = obj.coords.coords
                print(f"Extracted coords for Bloc {obj.id}:", coords)
                exterior_ring = coords[0] if isinstance(coords, tuple) and len(coords) > 0 else coords
                return [list(coord)[::-1] for coord in exterior_ring]
            except Exception as e:
                print(f"Error extracting positions for Bloc {obj.id}: {str(e)}")
                return []
        print(f"No coords for Bloc {obj.id}")
        return []

class DepartementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departement
        fields = ['id', 'asset']

class ConcessionSerializer(serializers.ModelSerializer):
    validity = serializers.SerializerMethodField()
    blocs = serializers.SerializerMethodField()
    department = serializers.SerializerMethodField()
    linkedPerimeters = serializers.SerializerMethodField()
    observation = serializers.CharField(source='notes', allow_blank=True)
    status = serializers.CharField(allow_null=True)
    positions = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField(),
            min_length=2,
            max_length=2
        ),
        min_length=3,
        write_only=True,
        required=False
    )
    positions_display = serializers.SerializerMethodField(source='positions')
    dept = serializers.PrimaryKeyRelatedField(queryset=Departement.objects.all(), allow_null=True)
    linked_prms = serializers.PrimaryKeyRelatedField(queryset=Concession.objects.all(), many=True, required=False)

    # def update(self, instance, validated_data):
    #     print(f"Validated data for update: {validated_data}")
    #     return super().update(instance, validated_data)

    class Meta:
        model = Concession
        fields = ['name', 'validity', 'blocs', 'department', 'status', 'linkedPerimeters', 'observation', 'positions', 'positions_display', 'dept', 'linked_prms','notes']
        read_only_fields = ['positions_display']

    def create(self, validated_data):
        print('Validated data in create:', validated_data)
        positions = validated_data.pop('positions', None)
        print('Positions in create:', positions)
        if positions:
            try:
                coords = [[pos[1], pos[0]] for pos in positions]
                if len(positions) < 3:
                    raise serializers.ValidationError("A polygon must have at least 3 points.")
                if coords[0] != coords[-1]:
                    coords.append(coords[0])
                validated_data['coords'] = MultiPolygon([Polygon(coords, srid=4326)], srid=4326)
            except Exception as e:
                print('Error creating MultiPolygon:', str(e))
                raise serializers.ValidationError(f"Invalid coordinates: {str(e)}")
        instance = super().create(validated_data)
        
        print('Instance coords after save:', instance.coords)
        return instance

    def get_positions_display(self, obj):
        if obj.coords:
            print(f"Coords for Concession {obj.name}:", obj.coords)
            coords = obj.coords.coords
            print(f"Extracted coords for Concession {obj.name}:", coords)
            try:
                exterior_ring = coords[0][0] if isinstance(coords, tuple) and len(coords) > 0 else coords
                return [list(coord)[::-1] for coord in exterior_ring]
            except Exception as e:
                print(f"Error extracting positions for Concession {obj.name}: {str(e)}")
                return []
        print(f"No coords for Concession {obj.name}")
        return []

    def get_validity(self, obj):
        contract = obj.contract_prm.first()
        if contract and contract.vig_date and contract.ech_date:
            vig_date = contract.vig_date.strftime('%d/%m/%Y')
            ech_date = contract.ech_date.strftime('%d/%m/%Y')
            return f"Du {vig_date} au {ech_date}"
        return "N/A"

    def get_blocs(self, obj):
        return ", ".join([bloc.id for bloc in obj.blocks.all()])

    def get_department(self, obj):
        return obj.dept.id if obj.dept else "N/A"

    def get_linkedPerimeters(self, obj):
        return ", ".join([prm.name for prm in obj.linked_prms.all()])

# serializers.py


class PhaseSerializer(serializers.ModelSerializer):
    surface = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        source='contract_pct',
        required=False,
        default=30.00
    )

    class Meta:
        model = Phase
        fields = ['id', 'name', 'duration', 'start_date', 'end_date', 'contract_pct', 'surface', 'surface_rendu']
        extra_kwargs = {
            'contract_pct': {'write_only': True},
            'start_date': {'read_only': True},  # Set programmatically in ContractSerializer
            'end_date': {'read_only': True},    # Set programmatically in ContractSerializer
        }
        

    def validate(self, data):
        logger.debug(f"PhaseSerializer validated data: {data}")  # Add logging
        if 'start_date' in data and not data.get('start_date'):
            raise serializers.ValidationError({'start_date': 'This field cannot be null if provided.'})
        if 'end_date' in data and not data.get('end_date'):
            raise serializers.ValidationError({'end_date': 'This field cannot be null if provided.'})
        return data

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance

class ContractSerializer(serializers.ModelSerializer):
    perimetre = serializers.CharField(source='prm.name', read_only=True)
    contractNumber = serializers.CharField(source='num')
    signatureDate = serializers.DateField(source='sign_date', read_only=True)
    effectiveDate = serializers.DateField(source='vig_date', read_only=True)
    contractDuration = serializers.SerializerMethodField()
    phases = PhaseSerializer(many=True, source='contract_phs', read_only=True)
    contract_phs = PhaseSerializer(many=True, write_only=True)  # For input
    prm = serializers.SlugRelatedField(
        queryset=Concession.objects.all(),
        slug_field='name',
        write_only=True
    )

    class Meta:
        model = Contract
        fields = ['contract_phs','perimetre', 'contractNumber', 'signatureDate', 'effectiveDate', 'contractDuration', 'phases', 'prm', 'sign_date', 'vig_date']
        extra_kwargs = {
            'sign_date': {'write_only': True},
            'vig_date': {'write_only': True},
        }

    def get_contractDuration(self, obj):
        if obj.sign_date and obj.vig_date:
            delta = (obj.vig_date - obj.sign_date).days // 30  # Approximate months
            return delta
        return 0

    def create(self, validated_data):
        phases_data = validated_data.pop('contract_phs', [])
        logger.debug(f"Phases data: {phases_data}")
        prm_instance = validated_data.pop('prm', None)
        if not prm_instance:
            raise serializers.ValidationError({'prm': 'Perimeter is required.'})

        sign_date = validated_data.get('sign_date')
        vig_date = validated_data.get('vig_date')

        contract_data = {
            'num': validated_data.get('num'),
            'sign_date': sign_date,
            'vig_date': vig_date,
            'prm': prm_instance,
            'phase_nb': len(phases_data),
        }
        logger.debug(f"Contract data: {contract_data}")

        total_phase_duration = sum(phase_data.get('duration', 0) for phase_data in phases_data)
        if vig_date:
            contract_data['ech_date'] = vig_date + relativedelta(months=total_phase_duration)
        else:
            contract_data['ech_date'] = sign_date + relativedelta(months=total_phase_duration)

        try:
            contract = Contract.objects.create(**contract_data)
            logger.debug(f"Created contract: {contract.num}, phase_nb: {contract.phase_nb}")
        except Exception as e:
            raise serializers.ValidationError({'error': f'Failed to create contract: {str(e)}'})

        current_start_date = sign_date if sign_date else date.today()
        logger.debug(f"Initial start_date for phases: {current_start_date}")

        for phase_data in phases_data:
            phase_name = phase_data.get('name')
            logger.debug(f"Processing phase: {phase_name}, data: {phase_data}")
            if phase_name not in dict(Phase._meta.get_field('name').choices):
                raise serializers.ValidationError({'phases': f'Invalid phase name "{phase_name}". Must be one of {list(dict(Phase._meta.get_field("name").choices).keys())}.'})
            phase_duration = phase_data.get('duration')
            if not isinstance(phase_duration, int) or phase_duration <= 0:
                raise serializers.ValidationError({'phases': f'Invalid duration for phase "{phase_name}": must be a positive integer.'})

            phase_start_date = current_start_date
            phase_end_date = phase_start_date + relativedelta(months=phase_duration)

            phase_data_full = {
                'ctr': contract,
                'name': phase_name,
                'duration': phase_duration,
                'start_date': phase_start_date,
                'end_date': phase_end_date,
                'contract_pct': phase_data.get('surface', 30.00),
                'surface_rendu': None,
            }
            try:
                phase = Phase.objects.create(**phase_data_full)
                logger.debug(f"Created phase: {phase.name}, start_date: {phase.start_date}, end_date: {phase.end_date}")
            except Exception as e:
                logger.error(f"Failed to create phase {phase_name}: {str(e)}")
                raise serializers.ValidationError({'phases': f'Failed to create phase: {str(e)}'})

            current_start_date = phase_end_date

        return contract

    def update(self, instance, validated_data):
        # Update contract fields
        phases_data = validated_data.pop('contract_phs', [])
        logger.debug(f"Phases data in update: {phases_data}")
        instance.num = validated_data.get('num', instance.num)
        instance.sign_date = validated_data.get('sign_date', instance.sign_date)
        instance.vig_date = validated_data.get('vig_date', instance.vig_date)

        if 'prm' in validated_data:
            instance.prm = validated_data['prm']

        # Sequential date calculation starting with sign_date
        current_start_date = instance.sign_date if instance.sign_date else date.today()
        logger.debug(f"Initial start_date for phases: {current_start_date}")

        # Update or create phases in sequence
        existing_phases = {phase.name: phase for phase in instance.contract_phs.all()}  # Index by name to respect unique_together
        for index, phase_data in enumerate(phases_data):
            phase_name = phase_data.get('name')
            if not phase_name:
                raise serializers.ValidationError({'phases': 'Phase name is required.'})

            # Validate phase name
            if phase_name not in dict(Phase._meta.get_field('name').choices):
                raise serializers.ValidationError({'phases': f'Invalid phase name "{phase_name}". Must be one of {list(dict(Phase._meta.get_field("name").choices).keys())}.'})

            phase_duration = phase_data.get('duration', 0)
            if not isinstance(phase_duration, int) or phase_duration < 0:
                raise serializers.ValidationError({'phases': f'Invalid duration for phase "{phase_name}": must be a non-negative integer.'})

            # Calculate start_date and end_date
            start_date = current_start_date
            end_date = start_date + relativedelta(months=phase_duration) if phase_duration else start_date

            phase_data_full = {
                'ctr': instance,
                'name': phase_name,
                'duration': phase_duration,
                'start_date': start_date,
                'end_date': end_date,
                'contract_pct': phase_data.get('surface', 30.00),
                'surface_rendu': phase_data.get('surface_rendu', None),
            }
            logger.debug(f"Phase data full: {phase_data_full}")

            if phase_name in existing_phases:
                # Update existing phase
                phase = existing_phases[phase_name]
                for field, value in phase_data_full.items():
                    setattr(phase, field, value)
                phase.save()
                logger.debug(f"Updated phase: {phase.name}, start_date: {phase.start_date}, end_date: {phase.end_date}")
            else:
                # Create new phase
                try:
                    phase = Phase.objects.create(**phase_data_full)
                    logger.debug(f"Created phase: {phase.name}, start_date: {phase.start_date}, end_date: {phase.end_date}")
                except Exception as e:
                    logger.error(f"Failed to create phase {phase_name}: {str(e)}")
                    raise serializers.ValidationError({'phases': f'Failed to create phase: {str(e)}'})

            # Set the start_date for the next phase
            current_start_date = end_date

        # Remove phases that are no longer in the payload
        new_phase_names = [phase_data.get('name') for phase_data in phases_data]
        for phase in instance.contract_phs.all():
            if phase.name not in new_phase_names:
                phase.delete()
                logger.debug(f"Deleted phase: {phase.name}")

        # Update contract's ech_date based on total phase duration
        total_phase_duration = sum(phase_data.get('duration', 0) for phase_data in phases_data)
        if instance.vig_date:
            instance.ech_date = instance.vig_date + relativedelta(months=total_phase_duration)
        else:
            instance.ech_date = instance.sign_date + relativedelta(months=total_phase_duration)

        instance.phase_nb = len(phases_data)
        instance.save()
        logger.debug(f"Updated contract: {instance.num}, phase_nb: {instance.phase_nb}, ech_date: {instance.ech_date}")

        return instance


class CommitementSerializer(serializers.ModelSerializer):
    phase = serializers.CharField(source='phase.name')
    duration = serializers.IntegerField(source='phase.duration')
    surface = serializers.FloatField(source='phase.contract_pct')
    sismique2D = serializers.FloatField(source='s2d_acq')
    sismique3D = serializers.FloatField(source='s3d_acq')
    retraitement2D = serializers.FloatField(source='retraitement_2d')
    retraitement3D = serializers.FloatField(source='retraitement_3d')
    puitsWildcat = serializers.IntegerField(source='well_wc')
    puitsDelineation = serializers.IntegerField(source='well_d')
    puitsAppreciation = serializers.IntegerField(source='well_app')
    tests = serializers.IntegerField(source='well_test')
    etudesG_G = serializers.IntegerField(source='gg_studies')
    acquisitionGravimetrie = serializers.IntegerField(source='gravimetry_acquisition')
    traitementGravimetrie = serializers.IntegerField(source='gravimetry_treatment')

    class Meta:
        model = Commitement
        fields = [
            'id', 'phase', 'duration', 'surface', 'sismique2D', 'sismique3D',
            'retraitement2D', 'retraitement3D', 'puitsWildcat', 'puitsDelineation',
            'puitsAppreciation', 'tests', 'etudesG_G', 'acquisitionGravimetrie',
            'traitementGravimetrie'
        ]

class EngagementDetailSerializer(serializers.Serializer):
    label = serializers.CharField()
    contractuel = serializers.FloatField()
    restePhase = serializers.FloatField()
    effectif = serializers.FloatField()
    resteRealiser = serializers.FloatField()

# class DemandeSerializer(serializers.ModelSerializer):
#     numeroDemande = serializers.CharField(source='num')
#     dateDemande = serializers.DateField(source='date_envoi')
#     type = serializers.CharField()
#     has_ts = serializers.BooleanField()
#     demande = serializers.SerializerMethodField()
#     dateReponse = serializers.DateField(source='date_resp', allow_null=True)
#     # accordee = serializers.SerializerMethodField()
#     accord = serializers.BooleanField()
#     dem_filename = serializers.CharField()
#     document_dem = serializers.CharField(write_only=True)  # Accept as base64 string
#     reponse = serializers.CharField(source='resp_num', allow_null=True)
#     motif = serializers.CharField()
#     phase = serializers.PrimaryKeyRelatedField(queryset=Phase.objects.all(), allow_null=True, required=False)
#     resp_filename = serializers.CharField(allow_null=True)
#     document_resp = serializers.CharField(write_only=True)
#     ctr = serializers.PrimaryKeyRelatedField(queryset=Contract.objects.all(), required=True)
    

#     class Meta:
#         model = Demande
#         fields = ['numeroDemande', 'type', 'has_ts', 'accord', 'dateDemande', 'dem_filename', 'document_dem',
#             'demande', 'dateReponse', 'reponse', 'motif', 'phase', 'resp_filename', 'document_resp', 'ctr']
#         read_only_fields = ['accord', 'has_ts']

#     def create(self, validated_data):
#         # Decode base64 to binary for document_dem
#         document_dem_b64 = validated_data.pop('document_dem')
#         validated_data['document_dem'] = base64.b64decode(document_dem_b64)
#          # Decode base64 to binary for document_resp, if present
#         document_resp_b64 = validated_data.pop('document_resp', None)
#         if document_resp_b64:
#             validated_data['document_resp'] = base64.b64decode(document_resp_b64)
#         else:
#             validated_data['document_resp'] = None

#         return super().create(validated_data)

#     def get_demande(self, obj):
#         return "Oui" if obj.has_ts else "Non"

#     def get_accordee(self, obj):
#         return "Oui" if obj.accord else "Non"

#     def validate(self, data):
#         if data.get('motif') == 'ACP' and not data.get('phase'):
#             raise serializers.ValidationError("The 'phase' field is required when motif is 'ACP'.")
#         return data




class DemandeSerializer(serializers.ModelSerializer):
    numeroDemande = serializers.CharField(source='num')
    dateDemande = serializers.DateField(source='date_envoi')
    type = serializers.CharField()
    has_ts = serializers.BooleanField()
    demande = serializers.SerializerMethodField()
    dateReponse = serializers.DateField(source='date_resp', allow_null=True)
    # accordee = serializers.SerializerMethodField()
    accord = serializers.BooleanField()
    dem_filename = serializers.CharField()
    document_dem = serializers.SerializerMethodField()  # Read as base64  # Accept as base64 string
    reponse = serializers.CharField(source='resp_num', allow_null=True)
    motif = serializers.CharField()
    phase = serializers.PrimaryKeyRelatedField(queryset=Phase.objects.all(), allow_null=True, required=False)
    resp_filename = serializers.CharField(allow_null=True)
    document_resp = serializers.SerializerMethodField()
    ctr = serializers.PrimaryKeyRelatedField(queryset=Contract.objects.all(), required=True)
    document_dem_input = serializers.CharField(write_only=True)  # Accept base64 input
    document_resp_input = serializers.CharField(write_only=True, allow_null=True)  # Accept base64 input

    class Meta:
        model = Demande
        fields = ['numeroDemande', 'type', 'has_ts', 'accord', 'dateDemande', 'dem_filename', 'document_dem',
            'demande', 'dateReponse', 'reponse', 'motif', 'phase', 'resp_filename', 'document_resp', 'ctr', 'document_dem_input', 'document_resp_input']
        read_only_fields = ['accord', 'has_ts']

    def create(self, validated_data):
        # Extract and decode base64 inputs
        document_dem_b64 = validated_data.pop('document_dem_input', None)
        if document_dem_b64:
            validated_data['document_dem'] = base64.b64decode(document_dem_b64)
        else:
            validated_data['document_dem'] = None

        document_resp_b64 = validated_data.pop('document_resp_input', None)
        if document_resp_b64:
            validated_data['document_resp'] = base64.b64decode(document_resp_b64)
        else:
            validated_data['document_resp'] = None

        return super().create(validated_data)

    def get_demande(self, obj):
        return "Oui" if obj.has_ts else "Non"

    def get_document_dem(self, obj):
        if obj.document_dem:
            return base64.b64encode(obj.document_dem).decode('utf-8')
        return None

    def get_document_resp(self, obj):
        if obj.document_resp:
            return base64.b64encode(obj.document_resp).decode('utf-8')
        return None

    def get_accordee(self, obj):
        return "Oui" if obj.accord else "Non"

    def validate(self, data):
        if data.get('motif') == 'ACP' and not data.get('phase'):
            raise serializers.ValidationError("The 'phase' field is required when motif is 'ACP'.")
        return data

# class SeismicSerializer(serializers.ModelSerializer):
#     designations = serializers.CharField(source='activity', default='Acq')
#     perimetre = serializers.CharField(source='prm.name')
#     nomEtude = serializers.CharField(source='name')
#     dateDebut = serializers.DateField(source='start_date', allow_null=True)
#     dateFin = serializers.DateField(source='end_date', allow_null=True)
#     compagnieService = serializers.CharField(source='company', allow_null=True)
#     kilometrage = serializers.FloatField(allow_null=True)
#     couts = serializers.IntegerField(source='cost', allow_null=True)
#     type = serializers.CharField()  # <-- add this line
#     dataQuality = serializers.CharField(source='data_quality', allow_null=True)  # <-- add this line
#      # Add positions for map rendering
#     positions = serializers.SerializerMethodField()  # Make position read-only and computed
#     prm = serializers.PrimaryKeyRelatedField(queryset=Concession.objects.all(), required=True) 

#     class Meta:
#         model = Seismic
#         fields = ['designations', 'perimetre', 'nomEtude', 'dateDebut', 'dateFin', 'compagnieService', 'kilometrage', 'couts', 'type', 'dataQuality', 'positions', 'prm']
# #for the map
#     def create(self, validated_data):
#         positions = validated_data.pop('positions', None)
#         if positions:
#             coords = [[pos[1], pos[0]] for pos in positions]
#             if validated_data['type'] == '2D':
#                 validated_data['coords'] = LineString(coords, srid=4326)
#             else:  # 3D
#                 if coords[0] != coords[-1]:
#                     coords.append(coords[0])
#                 validated_data['coords'] = Polygon(coords, srid=4326)
#         instance = super().create(validated_data)
#         instance.refresh_from_db()  # Refresh the instance to ensure coords is populated
#         return instance

# # for the map
#     def get_positions(self, obj):
#         if obj.coords:
#             if obj.type == '2D':
#                 coords = obj.coords.coords
#                 return [list(coord)[::-1] for coord in coords]  # LineString: [lat, lng]
#             else:  # 3D
#                 coords = obj.coords.coords
#                 return [list(coord)[::-1] for coord in coords[0]]  # Polygon: [lat, lng]
#         return []


class SeismicSerializer(serializers.ModelSerializer):
    nomEtude = serializers.CharField(source='name', allow_blank=True)  # Fixed source to 'name'
    positions = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField(),
            min_length=2,
            max_length=2
        ),
        min_length=2,
        write_only=True,
        required=False
    )
    positions_display = serializers.SerializerMethodField(source='positions')

    class Meta:
        model = Seismic
        fields = ['nomEtude', 'type', 'positions', 'positions_display','prm', 'start_date','end_date','company','cost','kilometrage','activity']
        read_only_fields = ['positions_display']

    def create(self, validated_data):
        print('Validated data in create:', validated_data)
        positions = validated_data.pop('positions', None)
        print('Positions in create:', positions)
        if positions:
            try:
                coords = [[pos[1], pos[0]] for pos in positions]
                if validated_data.get('type') == '3D':
                    if len(positions) < 3:
                        raise serializers.ValidationError("A 3D seismic polygon must have at least 3 points.")
                    if coords[0] != coords[-1]:
                        coords.append(coords[0])
                    validated_data['coords'] = Polygon(coords, srid=4326)
                else:
                    if len(positions) < 2:
                        raise serializers.ValidationError("A 2D seismic line must have at least 2 points.")
                    validated_data['coords'] = LineString(coords, srid=4326)
            except Exception as e:
                print('Error creating geometry:', str(e))
                raise serializers.ValidationError(f"Invalid coordinates: {str(e)}")
        instance = super().create(validated_data)
        instance.refresh_from_db()
        print('Instance coords after save:', instance.coords)
        return instance

    def get_positions_display(self, obj):
        if obj.coords:
            print(f"Coords for Seismic {obj.name}:", obj.coords)
            try:
                coords = obj.coords.coords
                print(f"Extracted coords for Seismic {obj.name}:", coords)
                if obj.type == '3D':
                    exterior_ring = coords[0] if isinstance(coords, tuple) and len(coords) > 0 else coords
                    return [list(coord)[::-1] for coord in exterior_ring]
                else:
                    return [list(coord)[::-1] for coord in coords]
            except Exception as e:
                print(f"Error extracting positions for Seismic {obj.name}: {str(e)}")
                return []
        print(f"No coords for Seismic {obj.name}")
        return []



# class WellSerializer(serializers.ModelSerializer):
#     # prm = ConcessionSerializer(read_only=True)
#     # position = serializers.SerializerMethodField()  # Add position for map rendering

#     prm = serializers.PrimaryKeyRelatedField(queryset=Concession.objects.all(), required=True)
#     position = serializers.SerializerMethodField()  # Make position read-only and computed

#     class Meta:
#         model = Well
#         fields = ['sigle', 'name', 'prm', 'type', 'objective', 'start_date', 'end_date', 'result', 'state', 'cost', 'company', 'offshore', 'position']

#     # for the map
#     def create(self, validated_data):
#         position = validated_data.pop('position', None)
#         if position:
#             # Convert [lat, lng] to [lng, lat] for GeoDjango
#             coords = [position[1], position[0]]
#             validated_data['coords'] = Point(coords, srid=4326)
#         instance = super().create(validated_data)
#         instance.refresh_from_db()  # Refresh the instance to ensure coords is populated
#         return instance

#     # for the map
#     def get_position(self, obj):
#         if obj.coords:
#             coords = obj.coords.coords
#             return list(coords[0])[::-1]  # Reverse [lng, lat] to [lat, lng]
#         return []


# ta3 doka ?
# class WellSerializer(serializers.ModelSerializer):
#     position = serializers.ListField(
#         child=serializers.FloatField(),
#         min_length=2,
#         max_length=2,
#         write_only=True,
#         required=False
#     )
#     position_display = serializers.SerializerMethodField(source='position')

#     class Meta:
#         model = Well
#         fields = ['sigle', 'position', 'position_display']
#         read_only_fields = ['position_display']

#     def create(self, validated_data):
#         print('Validated data in create:', validated_data)
#         position = validated_data.pop('position', None)
#         print('Position in create:', position)
#         if position:
#             try:
#                 validated_data['coords'] = Point(position[1], position[0], srid=4326)  # [lng, lat]
#             except Exception as e:
#                 print('Error creating Point:', str(e))
#                 raise serializers.ValidationError(f"Invalid coordinates: {str(e)}")
#         instance = super().create(validated_data)
#         instance.refresh_from_db()
#         print('Instance coords after save:', instance.coords)
#         return instance

#     def get_position_display(self, obj):
#         if obj.coords:
#             print(f"Coords for Well {obj.sigle}:", obj.coords)
#             coords = obj.coords.coords
#             print(f"Extracted coords for Well {obj.sigle}:", coords)
#             try:
#                 return [coords[1], coords[0]]  # Convert [lng, lat] to [lat, lng]
#             except Exception as e:
#                 print(f"Error extracting position for Well {obj.sigle}: {str(e)}")
#                 return []
#         print(f"No coords for Well {obj.sigle}")
#         return []



# fro the progremme puits 
# -------------------------------------------------------------------------------------
# class WellSerializer(serializers.ModelSerializer):
#     position = serializers.ListField(
#         child=serializers.FloatField(),
#         min_length=2,
#         max_length=2,
#         write_only=True,
#         required=False
#     )
#     position_display = serializers.SerializerMethodField(source='position')
#     prm = ConcessionSerializer(read_only=True)

#     class Meta:
#         model = Well
#         fields = ['sigle', 'position', 'position_display','prm', 'name','type','objective','start_date','end_date','result','cost','company']
#         read_only_fields = ['position_display']

#     def create(self, validated_data):
#         print('Validated data in create:', validated_data)
#         position = validated_data.pop('position', None)
#         print('Position in create:', position)
#         if position:
#             try:
#                 validated_data['coords'] = Point(position[1], position[0], srid=4326)  # [lng, lat]
#             except Exception as e:
#                 print('Error creating Point:', str(e))
#                 raise serializers.ValidationError(f"Invalid coordinates: {str(e)}")
#         instance = super().create(validated_data)
#         instance.refresh_from_db()
#         print('Instance coords after save:', instance.coords)
#         return instance

#     def get_position_display(self, obj):
#         if obj.coords:
#             print(f"Coords for Well {obj.sigle}:", obj.coords)
#             try:
#                 coords = obj.coords.coords
#                 print(f"Extracted coords for Well {obj.sigle}:", coords)
#                 if coords and len(coords) > 0:
#                     point = coords[0]  # Take the first point from ((lng, lat),)
#                     return [point[1], point[0]]  # Convert [lng, lat] to [lat, lng]
#                 return []
#             except Exception as e:
#                 print(f"Error extracting position for Well {obj.sigle}: {str(e)}")
#                 return []
#         print(f"No coords for Well {obj.sigle}")
#         return []
# --------------------------------------------------------------
class WellSerializer(serializers.ModelSerializer):
    position = serializers.ListField(
        child=serializers.FloatField(),
        min_length=2,
        max_length=2,
        write_only=True,
        required=False
    )
    position_display = serializers.SerializerMethodField()
    prm = ConcessionSerializer(read_only=True)
    prm_name = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Well
        fields = ['sigle', 'prm', 'prm_name', 'type', 'objective', 'start_date', 'end_date', 'result', 'cost', 'company', 'position', 'position_display','name']
        read_only_fields = ['prm', 'position_display']

    def validate_prm_name(self, value):
        if not Concession.objects.filter(name=value).exists():
            raise serializers.ValidationError(f"No Concession found with name '{value}'")
        return value

    def create(self, validated_data):
        position = validated_data.pop('position', None)
        prm_name = validated_data.pop('prm_name')

        # Resolve prm_name to Concession
        try:
            prm = Concession.objects.get(name=prm_name)
        except Concession.DoesNotExist:
            raise serializers.ValidationError({'prm_name': f"No Concession found with name '{prm_name}'"})
        validated_data['prm'] = prm

        # Handle position for geospatial coords
        if position:
            try:
                validated_data['coords'] = Point(position[1], position[0], srid=4326)  # [lng, lat]
            except Exception as e:
                raise serializers.ValidationError({'position': f"Invalid coordinates: {str(e)}"})

        instance = super().create(validated_data)
        instance.refresh_from_db()
        return instance

    def update(self, instance, validated_data):
        position = validated_data.pop('position', None)
        prm_name = validated_data.pop('prm_name', None)

        # Resolve prm_name to Concession if provided
        if prm_name:
            try:
                prm = Concession.objects.get(name=prm_name)
            except Concession.DoesNotExist:
                raise serializers.ValidationError({'prm_name': f"No Concession found with name '{prm_name}'"})
            validated_data['prm'] = prm

        # Handle position for geospatial coords
        if position:
            try:
                validated_data['coords'] = Point(position[1], position[0], srid=4326)  # [lng, lat]
            except Exception as e:
                raise serializers.ValidationError({'position': f"Invalid coordinates: {str(e)}"})

        instance = super().update(instance, validated_data)
        instance.refresh_from_db()
        return instance

    def get_position_display(self, obj):
        if obj.coords:
            try:
                coords = obj.coords.coords
                if coords and len(coords) >= 2:
                    return [coords[1], coords[0]]  # Convert [lng, lat] to [lat, lng]
                return []
            except Exception as e:
                return []
        return []


        

class GgStudiesSerializer(serializers.ModelSerializer):
    prm = ConcessionSerializer(read_only=True)
    prm_name = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = GgStudies
        fields = ['name', 'prm', 'prm_name', 'start_date', 'end_date', 'company', 'cost']
        read_only_fields = ['prm']

    def validate_prm_name(self, value):
        if not Concession.objects.filter(name=value).exists():
            raise serializers.ValidationError(f"No Concession found with name '{value}'")
        return value

    def create(self, validated_data):
        prm_name = validated_data.pop('prm_name')
        try:
            prm = Concession.objects.get(name=prm_name)
        except Concession.DoesNotExist:
            raise serializers.ValidationError({'prm_name': f"No Concession found with name '{prm_name}'"})
        validated_data['prm'] = prm
        return super().create(validated_data)

    def update(self, instance, validated_data):
        prm_name = validated_data.pop('prm_name', None)
        if prm_name:
            try:
                prm = Concession.objects.get(name=prm_name)
            except Concession.DoesNotExist:
                raise serializers.ValidationError({'prm_name': f"No Concession found with name '{prm_name}'"})
            validated_data['prm'] = prm
        return super().update(instance, validated_data)
# --------------------------------------------------------------------------------------
#update this ser to add prm_name in the create and update methods 

# class FracturationSerializer(serializers.ModelSerializer):
    # prm = serializers.SerializerMethodField()
    # well_name = serializers.CharField(source='well.sigle', read_only=True)
    # # well = serializers.CharField(write_only=True)  # Accept sigle as input
    # well_sigle = serializers.CharField(write_only=True, required=False)  # Add this line
    # prm_name = serializers.CharField(write_only=True, required=False, allow_blank=True)  # New writable field

    # class Meta:
    #     model = Fracturation
    #     fields = ['prm_name','name', 'prm', 'start_date', 'end_date', 'company', 'cost', 'init_rate', 'fin_rate', 'reservoirs', 'well_name', 'well_sigle']

    # def get_prm(self, obj):
    #     if obj.phase and obj.phase.ctr and obj.phase.ctr.prm:
    #         return obj.phase.ctr.prm.name
    #     return None

    # def get_prm(self, obj):
    #     if obj.phase and obj.phase.ctr and obj.phase.ctr.prm:
    #         return obj.phase.ctr.prm.name
    #     return None

    # def validate_well(self, value):
    #     if not Well.objects.filter(sigle=value).exists():
    #         raise serializers.ValidationError(f"No Well found with sigle '{value}'")
    #     return value

    # def create(self, validated_data):
    #     well_sigle = validated_data.pop('well_sigle', None)
    #     try:
    #         validated_data['well'] = Well.objects.get(sigle=well_sigle)
    #     except Well.DoesNotExist:
    #         raise serializers.ValidationError({
    #             'well_sigle': f'Well with sigle "{well_sigle}" does not exist'
    #     })
    #     return super().create(validated_data)

    # def update(self, instance, validated_data):
    #     well_sigle = validated_data.pop('well_sigle', None)
    #     if well_sigle is not None:
    #         try:
    #             validated_data['well'] = Well.objects.get(sigle=well_sigle)
    #         except Well.DoesNotExist:
    #             raise serializers.ValidationError({
    #                 'well_sigle': f'Well with sigle "{well_sigle}" does not exist'
    #             })
    #     return super().update(instance, validated_data)

# and this is the new ser i added the prm_name field to it 
class FracturationSerializer(serializers.ModelSerializer):
    prm = serializers.SerializerMethodField()
    well_name = serializers.CharField(source='well.sigle', read_only=True)
    # well = serializers.CharField(write_only=True)  # Accept sigle as input
    well_sigle = serializers.CharField(write_only=True, required=False)  # Add this line
    prm_name = serializers.CharField(write_only=True, required=False, allow_blank=True)  # New writable field

    class Meta:
        model = Fracturation
        fields = ['prm_name','name', 'prm', 'start_date', 'end_date', 'company', 'cost', 'init_rate', 'fin_rate', 'reservoirs', 'well_name', 'well_sigle']

    def get_prm(self, obj):
        if obj.phase and obj.phase.ctr and obj.phase.ctr.prm:
            return obj.phase.ctr.prm.name
        return None

    def validate_well(self, value):
        if not Well.objects.filter(sigle=value).exists():
            raise serializers.ValidationError(f"No Well found with sigle '{value}'")
        return value

    def validate_prm_name(self, value):
        if value and not Concession.objects.filter(name=value).exists():
            raise serializers.ValidationError(f"No Concession found with name '{value}'")
        return value

    def create(self, validated_data):
        prm_name = validated_data.pop('prm_name', None)
        well_sigle = validated_data.pop('well_sigle', None)
        validated_data['well'] = Well.objects.get(sigle=well_sigle)

        if prm_name:
            # Find a phase linked to a contract with the matching concession
            phase = Phase.objects.filter(ctr__prm__name=prm_name).first()
            if not phase:
                raise serializers.ValidationError(f"No phase found for perimeter '{prm_name}'")
            validated_data['phase'] = phase

        return super().create(validated_data)

    def update(self, instance, validated_data):
        prm_name = validated_data.pop('prm_name', None)
        well_sigle = validated_data.pop('well_sigle', None)
        if well_sigle:
            validated_data['well'] = Well.objects.get(sigle=well_sigle)

        if prm_name:
            phase = Phase.objects.filter(ctr__prm__name=prm_name).first()
            if not phase:
                raise serializers.ValidationError(f"No phase found for perimeter '{prm_name}'")
            validated_data['phase'] = phase

        return super().update(instance, validated_data)
# -------------------------------------------------------------------------------------------




class DepartementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departement
        fields = ['id', 'asset']  # Adjust fields as needed


# planning sismique
# class SeisMonthlyPrevisionsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SeisMonthlyPrevisions
#         fields = ['sisProg', 'month', 'year', 'pv', 'meq', 'kilometrage_prev', 'cost_sci', 'cost_ci']

#     def to_representation(self, instance):
#         # Transform model data to match frontend structure
#         month_map = {
#             1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Avr', 5: 'Mai', 6: 'Juin',
#             7: 'Juil', 8: 'Aout', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
#         }
#         data = {
#             'm-eq': {},
#             'Kilometrage': {},
#             'PV': {},
#             'KDA SCI': {},
#             'KDA avec CI': {}
#         }
#         for month_num in range(1, 13):
#             month_name = month_map[month_num]
#             data['m-eq'][month_name] = instance.meq if instance.month == month_num else 0
#             data['Kilometrage'][month_name] = instance.kilometrage_prev if instance.month == month_num else 0
#             data['PV'][month_name] = instance.pv if instance.month == month_num else 0
#             data['KDA SCI'][month_name] = instance.cost_sci if instance.month == month_num else 0
#             data['KDA avec CI'][month_name] = instance.cost_ci if instance.month == month_num else 0
#         return data

#     def create(self, validated_data):
#         # Handle bulk creation for all months
#         sisProg = validated_data['sisProg']
#         year = validated_data['year']
#         month = validated_data['month']
#         data = self.context['request'].data.get('data', {})
#         month_map = {'Jan': 1, 'Fev': 2, 'Mar': 3, 'Avr': 4, 'Mai': 5, 'Juin': 6,
#                      'Juil': 7, 'Aout': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12}

#         # Delete existing forecasts for this project and year
#         SeisMonthlyPrevisions.objects.filter(sisProg=sisProg, year=year).delete()

#         # Create or update records for each month
#         for month_name, month_num in month_map.items():
#             forecast_data = {
#                 'sisProg': sisProg,
#                 'month': month_num,
#                 'year': year,
#                 'pv': data.get('PV', {}).get(month_name, 0),
#                 'meq': data.get('m-eq', {}).get(month_name, 0),
#                 'kilometrage_prev': data.get('Kilometrage', {}).get(month_name, 0),
#                 'cost_sci': data.get('KDA SCI', {}).get(month_name, 0),
#                 'cost_ci': data.get('KDA avec CI', {}).get(month_name, 0),
#             }
#             serializer = SeisMonthlyPrevisionsSerializer(data=forecast_data)
#             if serializer.is_valid():
#                 serializer.save()
#             else:
#                 raise serializers.ValidationError(serializer.errors)

#         return SeisMonthlyPrevisions.objects.get(sisProg=sisProg, month=month, year=year)


# planning sismique
class SeisMonthlyPrevisionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeisMonthlyPrevisions
        fields = ['sisProg', 'month', 'year', 'pv', 'meq', 'kilometrage_prev', 'cost_sci', 'cost_ci']

    def validate(self, attrs):
        return attrs  # Bypass uniqueness validation (though not critical since view handles saving)

    def to_representation(self, instance):
        month_map = {
            1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Avr', 5: 'Mai', 6: 'Juin',
            7: 'Juil', 8: 'Aout', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
        }
        data = {
            'm-eq': {},
            'Kilometrage': {},
            'PV': {},
            'KDA SCI': {},
            'KDA avec CI': {}
        }
        for month_num in range(1, 13):
            month_name = month_map[month_num]
            forecast = SeisMonthlyPrevisions.objects.filter(sisProg=instance.sisProg, year=instance.year, month=month_num).first()
            data['m-eq'][month_name] = forecast.meq if forecast else 0
            data['Kilometrage'][month_name] = forecast.kilometrage_prev if forecast else 0
            data['PV'][month_name] = forecast.pv if forecast else 0
            data['KDA SCI'][month_name] = forecast.cost_sci if forecast else 0
            data['KDA avec CI'][month_name] = forecast.cost_ci if forecast else 0
        return data



# planning forage
# accounts/serializers.py
from rest_framework import serializers
from accounts.models import DrillMonthlyPrevisions, Well

class DrillMonthlyPrevisionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrillMonthlyPrevisions
        fields = ['wellProg', 'month', 'year', 'metrage', 'mapp', 'cost']

    def to_representation(self, instance):
        month_map = {
            1: 'Jan', 2: 'Fév', 3: 'Mar', 4: 'Avr', 5: 'Mai', 6: 'Juin',
            7: 'Juil', 8: 'Août', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Déc'
        }
        data = {
            'metrage': {},
            'M-app': {},
            'MDA': {}
        }
        for month_num in range(1, 13):
            month_name = month_map[month_num]
            forecast = DrillMonthlyPrevisions.objects.filter(
                wellProg=instance.wellProg,
                year=instance.year,
                month=month_num
            ).first()
            data['metrage'][month_name] = forecast.metrage if forecast else 0
            data['M-app'][month_name] = forecast.mapp if forecast else 0
            data['MDA'][month_name] = forecast.cost if forecast else 0
        return data


class TransactionLogSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        
        return obj.user.username if obj.user else 'Anonymous'

    class Meta:
        model = TransactionLog
        fields = ['user', 'model_name', 'object_id', 'action', 'changes', 'timestamp']


# Reservoir Estimate


class WellReservoirFluidSerializer(serializers.ModelSerializer):
    class Meta:
        model = WellReservoirFluid
        fields = ['id', 'well', 'fluid', 'reservoir', 'reservoir_unit', 'discovery_year', 'status', 'nature']

class ReserveEstimationCreateSerializer(serializers.ModelSerializer):
    well_sigle = serializers.CharField(write_only=True)
    fluid = serializers.ChoiceField(choices=[('H', 'Huile'), ('G', 'Gaz'), ('C', 'Condensat'), ('GA', 'Gaz associé')], write_only=True)
    reservoir = serializers.CharField(write_only=True)
    well_fluid_reservoir = serializers.PrimaryKeyRelatedField(queryset=WellReservoirFluid.objects.all(), write_only=True, required=False)

    class Meta:
        model = ReserveEstimation
        fields = ['well_sigle', 'fluid', 'reservoir', 'proved', 'probable', 'possible', 'estimator', 'comments', 'well_fluid_reservoir']

    def create(self, validated_data):
        well_sigle = validated_data.pop('well_sigle')
        fluid = validated_data.pop('fluid')
        reservoir = validated_data.pop('reservoir')
        well = Well.objects.get(sigle=well_sigle)
        wrf, created = WellReservoirFluid.objects.get_or_create(
            well=well,
            fluid=fluid,
            reservoir=reservoir,
            defaults={
                'reservoir_unit': 'Unknown',
                'discovery_year': 2025,
                'status': 'D',
                'nature': 'D'
            }
        )
        validated_data['well_fluid_reservoir'] = wrf
        return ReserveEstimation.objects.create(**validated_data)

    def validate(self, data):
        # Ensure required fields are present
        if not all([data.get('well_sigle'), data.get('fluid'), data.get('reservoir'), 
                    data.get('proved') is not None, data.get('probable') is not None, 
                    data.get('possible') is not None, data.get('estimator')]):
            raise serializers.ValidationError("All required fields must be provided.")
        return data