<?php

namespace App\Filament\Resources\EthicsApplications\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class EthicsApplicationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\Select::make('study_id')
                    ->relationship('study', 'title')
                    ->searchable()
                    ->preload()
                    ->required(),
                \Filament\Forms\Components\Select::make('institution_id')
                    ->relationship('institution', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),
                \Filament\Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->label('Submitted By')
                    ->searchable()
                    ->preload()
                    ->required(),
                \Filament\Forms\Components\FileUpload::make('protocol_document')
                    ->directory('ethics/protocols'),
                \Filament\Forms\Components\FileUpload::make('consent_form')
                    ->directory('ethics/consent'),
                \Filament\Forms\Components\Select::make('status')
                    ->options([
                        'Pending Review' => 'Pending Review',
                        'Approved' => 'Approved',
                        'Rejected' => 'Rejected',
                        'Revision Requested' => 'Revision Requested',
                    ])
                    ->default('Pending Review')
                    ->required(),
                \Filament\Forms\Components\DatePicker::make('submission_date')
                    ->default(now()),
            ]);
    }
}
